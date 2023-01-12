import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function CustomAlert(props) {

  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    props.onClose();
  };

  return (
    <div>

      <Snackbar open={open} autoHideDuration={2000 ? (props.alertNote.length > 50 ? 5000 : 3000) : null} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert
          onClose={handleClose}
          severity={props.alertStyle}>
          {props.alertNote}
        </Alert>
      </Snackbar>

    </div>
  );
}
