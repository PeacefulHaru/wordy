import React, {Fragment} from 'react';
import { State } from '../../types';
// Material UI Core
import Button from '@material-ui/core/Button';
// Redux
import store from '../../redux/store';
import { useSelector } from 'react-redux';
// redux actions
import { fetchy3, consoler } from '../../redux/actions/apiAction';
import { authenticate, askForCode, createPlayer, gameStart, refreshScrabbly } from '../../redux/actions/scrabblyAction';

export default function AdminPage() {
  const handleGenerateKey = () => {
    store.dispatch(fetchy3('post', '/permissions', null, consoler));
  }
  
  return (
    <Fragment>
      <Button onClick={() => handleGenerateKey()}>Generate random GAME KEY</Button>
    </Fragment>
  )
}