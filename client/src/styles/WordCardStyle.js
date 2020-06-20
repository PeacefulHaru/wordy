/**
 * This wordCard.js contains styling of a card word
 */

// Import the basics
import React from 'react';

// Bootstrap Import
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

// Material UI Import
import IconButton from '@material-ui/core/IconButton';
import EditRounded from '@material-ui/icons/EditRounded';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function StringfyWord (props) {
  const word = props.word;

  let pronunciation = '';
  let definition = '';
  let exampleSentence = '';

  // Check if the pronunciation exists
  if(word.pronunciation){
    pronunciation = ` [${word.pronunciation}]`;
  }

   // Check if the pronunciation exists
   if(word.definition){
     // Check if the pronunciation exists again.
     if(word.pronunciation){
      definition = ` ${word.definition}`;
    }else{
      definition = ` - ${word.definition}`;
    }
  }

  // Check if the exampleSentence exists
  if(word.exampleSentence){
    exampleSentence = ` = ${word.exampleSentence}`;
  }

  return `${word.word}${pronunciation}${definition}${exampleSentence}`
}

function WordCardStyle (props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const word = props.word;
  return(
    <div>
      <Card className="text-center" key={word.id}>
        <Card.Body>
          <Card.Text>
            <StringfyWord word={word} />
            <IconButton aria-label="edit" onClick={handleClickOpen}>
              <EditRounded />
            </IconButton>
            <Badge style={{marginLeft: 12}} variant="success">Review</Badge>{' '}
          </Card.Text>
        </Card.Body>
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hello World
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

export default WordCardStyle;