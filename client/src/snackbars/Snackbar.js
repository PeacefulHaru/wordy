import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarModal(props) {
  const AUTO_CLOSING_SECONDS = 5;
  const classes = useStyles();

  let open;
  if(props.snackbar.status === 'open') {
    open = true;
  }

  // success default (error, warning, info, success) (red, orange, blue, green)
  let chosenSecerity = props.snackbar.severity ? props.snackbar.severity : "success";
  

  const handleClose = (event, reason) => {
    open = false;
    if (reason === 'clickaway') {
      return;
    }
    props.setSnackbar({status: 'none'});
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={AUTO_CLOSING_SECONDS * 1000} onClose={(e, r) => handleClose(e, r)}>
        <Alert onClose={(e, r) => handleClose(e, r)} severity={chosenSecerity}>
          {props.snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}