import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Define the interface for the props
interface SnackbarComponentProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  message: string;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ open, severity, onClose, message, vertical, horizontal }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical, horizontal }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
