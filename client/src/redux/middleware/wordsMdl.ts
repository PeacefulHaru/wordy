// types
import { WordsChunk, Word, State } from '../../types';
// actions
import {updateWords, POST_WORDS, SAVING_HELPER, SET_WORDS, GET_WORDS, MODIFY_WORDS, DELETE_WORDS, SYNC_WORDS} from '../actions/wordsAction';
import {modifySupport, addSemNoDup, deleteSem, getSupport} from '../actions/supportAction';
import { fetchy, fetchy3 } from '../actions/apiAction';
import { getWords, setWords, savingHelper } from '../actions/wordsAction';
import {setSnackbar} from '../actions';

const validate = (payload: WordsChunk): boolean => {
  // This validation requires every payload of words has to have the same sem value. 
  // This web-app adds, removes, and sync in chunk with the same sem value.
  const STANDARD_SEM = payload[0].sem;
  const result = payload.filter((word: Word) => word.sem !== STANDARD_SEM);
  return result.length === 0 ? true : false;
}

// Middlewares
// Fecthy 3
export const getWordsMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === GET_WORDS) {
    const { user }: State = getState();
    const sem = action.payload;
    dispatch(fetchy3('get', `/words/${user.ID}/${sem}`, null, setWords));
  }
};

// Fetchy 3
export const setWordsMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if (action.type === SET_WORDS) {
    // Payload and States
    const payload: WordsChunk  = action.payload;
    const { words }: State = getState();
    
    if(payload.length === 0) return; 
    dispatch(updateWords([...words, payload]));

  } 
};

// Fetchy 3
export const postWordsMdl  = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  // Declaration and data validation check
  next(action);
  
  if (action.type === POST_WORDS) {
    // #1 Validate given data and Declare the necessary.
    const {payload} = action;
    const isDataValid = validate(payload);
    if (isDataValid === false) dispatch(setSnackbar('Invalid data given ', 'error')); // possibly temporary
    if (isDataValid === false) return;
    const {user, support}: State = getState(); // interesting (learn something)
    const sem = (payload as WordsChunk)[0].sem;
    // dispatch(getSupport()); // Update the support just in case // This line of code created a very light non-chagning bug

    // #2 Put some more necessary data
    let newWordCnt: number = support.newWordCnt;
    const newWordsPayload = payload.map((word: Word) => {
      newWordCnt += 1;
      return {
        ...word, ownerID: user.ID, isFavorite: false, order: newWordCnt, language: support.addWordLangPref,
        lastReviewed: word.dateAdded, reviewdOn: [], step: 5 //5 for myself and eventually 1 later.
      } as Word
    });

    // #3 Handle Back & Front
    dispatch(fetchy3('post', '/words/fetchy3', newWordsPayload, savingHelper));

    // Adding Words will have an affect on supports.
    dispatch(modifySupport({ newWordCnt }));
    dispatch(addSemNoDup(sem));
  }
};

// #MODIFY
export const modifyWordsMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if(action.type === MODIFY_WORDS) {
    const {sem, data}: {sem: number, data: {wordID: string, payload: object}[]} = action.payload;
    const {words}: State = getState();

    dispatch(fetchy('put', '/words', data));
    const hasFound = (words as WordsChunk[]).find(datus => datus[0].sem === sem);
    if (typeof hasFound !== "undefined") {
      const newWords = hasFound.map(word => {
        const index = data.findIndex(datus => datus.wordID === word._id);
        if (index !== -1) {
          const newProperty = data.splice(index, 1)[0].payload;
          return {...word, ...newProperty}
        }
        return word;
      });
      dispatch(updateWords([...words.filter(wordsChunk => wordsChunk[0].sem !== sem), newWords])) //add
    }

    // Removing words may have an affect on supports
  }
};

export const deleteWordsMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if(action.type === DELETE_WORDS) {
    const {sem, IDs}: {sem: number, IDs: {ID: string}[]} = action.payload;
    const {words, support}: State = getState();
    const deletedWordCnt = support.deletedWordCnt + IDs.length;

    dispatch(fetchy('delete', '/words', IDs));
    const hasFound = (words as WordsChunk[]).find(datus => datus[0].sem === sem);
    if (typeof hasFound !== "undefined") {
      const newChunk = hasFound.filter(word => {
        const index = IDs.findIndex(datus => datus.ID === word._id);
        if (index !== -1) {
          IDs.splice(index, 1);
          return false;
        }
        return true;
      });
      if (newChunk.length === 0) {
        dispatch(deleteSem(sem));
        dispatch(updateWords([...words.filter(wordsChunk => wordsChunk[0].sem !== sem)]));
      }
      else
        dispatch(updateWords([...words.filter(wordsChunk => wordsChunk[0].sem !== sem), newChunk]));
    }
    dispatch(modifySupport({ deletedWordCnt }))
  }
};

export const savingHelperMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);

  if(action.type === SAVING_HELPER) {
    const newWords: WordsChunk = action.payload; // payload first
    const {words: prevWords, support}: State = getState(); // global states next
    const semOfNewWords = newWords[0].sem;
    const sems = support.sems;
    // Logic
    let hasFound = (prevWords as WordsChunk[]).find(datus => datus[0].sem === semOfNewWords);
    if(typeof hasFound === "undefined") {
      // You want to chwck if it exists in the database.
      const foundIndex = sems.findIndex(sem => sem === semOfNewWords);
      if (foundIndex === -1) dispatch(updateWords([...prevWords, newWords])); // because it does not exist
      // 만약에 다운을 안 받은 상태면 애초에 다운 받을 필요가 없으므로 안함. 누르고 추가 잘 되므로 이상.
    }
    else { // already has been downloaded.
      hasFound = [...hasFound, ...newWords];
      dispatch(updateWords([...(prevWords as WordsChunk[]).filter(elem => elem[0].sem !== semOfNewWords), hasFound]))
    }
    
  }
};

export const syncWordsMdl = ({dispatch, getState} : any) => (next: any) => (action: any) => {
  next(action);
  if(action.type === SYNC_WORDS) {
    // Payload and States
    const { syncTargetSem } = action.payload;
    const { words }: State = getState();
    // Sync others
    dispatch(getSupport());
    // Delete the sem
    const newWordsList = words.filter(wordChunk => wordChunk[0].sem !== syncTargetSem);
    dispatch(updateWords(newWordsList));
    // Get the fresh words from database
    dispatch(getWords(syncTargetSem));
  };
};

export const wordsMdl = [getWordsMdl, setWordsMdl, postWordsMdl, modifyWordsMdl, deleteWordsMdl, savingHelperMdl, syncWordsMdl]; 