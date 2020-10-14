// Mains & Types
import React, {useState} from 'react';
import * as API from '../../API';
import { format_into_sem, today } from '../../utils'
import { State } from '../../types';
// Components
import AvailableLangs from '../../components/available_langs/AvailableLangs';
import {VALID_YEAR} from '../add_word/AddWordsDialog';
// Translation
import tr from './mass_words.tr.json';
import trAddWord from '../add_word/add_words_dialog.tr.json';
// MUI
import IconButton from '@material-ui/core/IconButton';  
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// icons
import SwitchBackToOneMode from '@material-ui/icons/AddBox';
// Redux
import store from '../../redux/store';
import {offDialog, setSnackbar } from '../../redux/actions';
import {postWords} from '../../redux/actions/wordsAction';
import {useSelector} from 'react-redux';
import ParsingAPI from './ParsingAPI';
import { stringify } from 'querystring';
const LETTERS_LIMITATION = 30000

const MassWords = () => {
  // Redux states
  const {user, language} = useSelector((state: State) => state);
  const ln = language;
  // Component states
  const [count, setCount] = useState(0);
  const [massData, setMassData] = useState('');
  const [maxError, setMaxError] = useState(false);
  const [year, setYear] = useState(today().year.toString());
  const [sem, setSem] = useState(today().sem.toString());

  // Methods
  const handleMassDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMassData(e.target.value);
    setCount(e.target.value.length);
    if(LETTERS_LIMITATION < e.target.value.length) {
      setMaxError(true);
      setMassData(e.target.value.slice(0, LETTERS_LIMITATION))
    }else{
      setMaxError(false);
    }
  }

  const handleAddingMassData = () => {
    if(!API.checkValidDataOfExtraYear(year, sem, VALID_YEAR.from, VALID_YEAR.to)) {
      store.dispatch(setSnackbar(`INVALID YEAR RANGE (${VALID_YEAR.from}~${VALID_YEAR.to}) OR SEM (1~4)`, 'warning', 5))
      return;
    }
    store.dispatch(offDialog())
    // Data check
    const data = ParsingAPI(massData, format_into_sem(parseInt(year), parseInt(sem)))
    store.dispatch(postWords(data))
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={() => store.dispatch(offDialog())}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle id="alert-dialog-title">
          {tr.title[ln]}
          <IconButton size='small' style={{display: 'block', float:'right',textAlign:'right'}} 
            onClick={() => API.handleNewWordAddingType(user.ID!, 'one')}>
            <SwitchBackToOneMode />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {tr.desc[ln]}
          </DialogContentText>
          <AvailableLangs />
          <TextField margin="dense" label={trAddWord.year[ln]} 
            fullWidth value={year} 
            onChange={(e) => setYear(e.target.value)}
          />
          <TextField margin="dense" label={trAddWord.sem[ln]}  
            fullWidth value={sem}
            onChange={(e) => setSem(e.target.value)}
          />
          <TextField required id="standard-required" label={`Data ${count}/${LETTERS_LIMITATION}`}
            style={{width: '100%', textAlign:'center'}} multiline rows={15} rowsMax={20}
            value={massData} onChange={(e) => handleMassDataChange(e)}
            error={maxError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => store.dispatch(offDialog())} color="secondary">
            {trAddWord.btnCancel[ln]}
          </Button>
          <Button onClick={() => handleAddingMassData()} color="primary" variant="contained">
            {trAddWord.btnOkay[ln]}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MassWords;