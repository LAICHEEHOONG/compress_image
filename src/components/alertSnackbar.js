import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { setAlertStatus } from '../features/parameter/parameterSlice';

export default function AlertSnackbar() {

  const dispatch = useDispatch();
  const alertStatus = useSelector(state => state.parameter.openAlert);
  const alserText = useSelector(state => state.parameter.alertText);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlertStatus(false))
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={alertStatus}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'  }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alserText}
        action={action}
      />
    </div>
  );
}