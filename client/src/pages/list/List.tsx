import React, {Fragment} from 'react';
import * as API from '../../API';
import './List.css';
import {State} from '../../types';
import YearChip from './YearChip';
// Material UI
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// Translation
import tr from './list.tr.json';
import {useSelector} from 'react-redux';
// Theme
import { listDark, listLight } from '../../theme';

const List = () => {
  // Redux states
  const {language, support, user} = useSelector((state: State) => state);
  const ln = language;

  return (
    <Fragment>
      <Container maxWidth="md" style={{marginTop: 10, textAlign: "center"}}>
      <Typography component="div" style={{ backgroundColor: support.isDarkMode ? listDark : listLight, height: '30vh' }}>
        {support.sems.length === 0
          ? <div style={{paddingTop: 40}}>
              <h4>{tr.empty[ln]}</h4>
              <Button variant="outlined" color="primary" 
                onClick={() => API.handleNewWordAddingType(user.ID!, 'one')}>
                {tr.emptyBtn[ln]}
              </Button>
              <Button variant="outlined" color="secondary" 
                onClick={() => API.handleNewWordAddingType(user.ID!, 'mass')}>
                {tr.emptyProBtn[ln]}
              </Button>
            </div>
          : <YearChip />
        }
        </Typography>
      </Container>
    </Fragment>
    
  )
};

export default List;