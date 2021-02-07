//
export const GET_SUPPORT = '[SUPPORT] Get'
export const UPDATE_SUPPORT = '[SUPPORT] Update';
export const SET_SUPPORT = '[SUPPORT] Set';
export const MODIFY_SUPPORT = '[SUPPORT] Modify'
export const SYNC_SUPPORT = '[SYNC_SUPPORT] Sync Support'
export const ADD_SEM_NO_DUPLICATE = '[SUPPORT] Add Sem (No Duplicate)';
export const DELETE_SEM = '[SUPPORT] Delete sem';
export const MODIFY_RECOMMANDED_TAGS = '[SUPPORT] Modify Recommanded Tags';
export const SWITCH_DARK_LIGHT_MODE = '[SUPPORT] Switch Dark Light Mode';
// Ultimately
export const updateSupport = (data: object) => {
  return {
    type: UPDATE_SUPPORT,
    payload: data
  };
};

export const getSupport = () => {
  return {
    type: GET_SUPPORT
  };
};

export const setSupport = (data: any) => {
  return {
    type: SET_SUPPORT,
    payload: data
  };
};

export const modifySupport = (data: object) => {
  return {
    type: MODIFY_SUPPORT,
    payload: data
  };
}

export const syncSupport = () => {
  return {
    type: SYNC_SUPPORT
  }
}



export const addSemNoDup = (data: number) => {
  return {
    type: ADD_SEM_NO_DUPLICATE,
    payload: data
  }
}

export const deleteSem = (sem: number) => {
  return {
    type: DELETE_SEM,
    payload: sem
  }
}

export const modifyRecommandedTags = (newRecommandedTags: string[]) => {
  return {
    type: MODIFY_RECOMMANDED_TAGS,
    payload: newRecommandedTags
  }
};

/**
 * To switch between Dark Mode and Light Mode 
 * It has the complicated logic using both cookie, database and login status to clarfy
 */
 export const switchDarkLightMode = (
   mode: 'light' | 'dark'
 ) => {
   return {
     type: SWITCH_DARK_LIGHT_MODE,
     payload: mode
   }
 };