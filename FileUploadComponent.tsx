import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDropzone, DropzoneState } from 'react-dropzone';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import FileActions from '../../Actions/FileActions';

// Define the type for the props
interface FileUploadComponentProps {
  text: string;
}

// Define the type for the open message state
interface OpenMessage {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  severity: 'success' | 'error' | 'info' | 'warning';
  msg: string;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ text }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: '',
  });
  const [attachmentClick, setAttachmentClick] = useState(false);
  const dispatch=useDispatch();
  const handleAttachmentClick = () => {
    setAttachmentClick(true);
  };

  const handleClose = () => {
    setAttachmentClick(false);
    setUploadedFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
    onDrop: (files: File[]) => {
      const validFiles = files.filter(
        (file) =>
          [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ].includes(file.type) || ['.csv', '.xlsx', '.xls'].includes(file.name.slice(-4))
      );
      setUploadedFiles(validFiles);
    },
  });

  const handleUpload = () => {
    if (uploadedFiles.length > 0) {
      dispatch(FileActions.UploadedFiles(uploadedFiles))
      setAttachmentClick(false);
      setUploadedFiles([]);
      setOpenMessage({ ...openMessage, open: true, msg: 'File Uploaded Successfully!!' });
    }
  };

  const uploadButtonStyle: React.CSSProperties = {
    backgroundColor: uploadedFiles.length > 0 ? '#035C67' : '',
    color: uploadedFiles.length > 0 ? 'white' : 'black',
    marginLeft: '1rem',
  };

 

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
      <p>{text}</p>
        <Button
          variant="contained"
          size="small"
          className="button upload-button"
          style={{ marginRight: '1rem',borderRadius:'2rem' }}
          onClick={handleAttachmentClick}
        >
          Upload
        </Button>
        
        {/* <TextField label={text} variant="filled" disabled style={{ width: '50%' }} size="small" /> */}
      </div>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={attachmentClick}
        maxWidth="xs"
        fullWidth
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogTitle
          id="customized-dialog-title"
          style={{ padding: '1rem 1rem 0 1.5rem', margin: 0 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" style={{ color: '#035C67', margin: 0 }}>
              <b>Upload files and documents</b>
            </Typography>
            <IconButton onClick={handleClose} style={{ padding: 0 }}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div {...getRootProps()} style={{ textAlign: 'center' }}>
            <input {...getInputProps()} />
            <div style={{ border: '1px dashed black', padding: '1.75rem 3rem' }}>
              Drag and drop files here or{' '}
              <span style={{ textDecoration: 'underline' }}>choose files</span>
            </div>
          </div>

          {/* <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginTop: '0.5rem' }}>
            <p style={{ margin: 0 }}>Files supported: CSV, XLSX, XLS</p>
            <p style={{ margin: 0 }}>Maximum size: 20MB</p>
          </div> */}
          {uploadedFiles.length != 0 && (
            <b>
              <p>Uploaded files</p>
            </b>
          )}

          {uploadedFiles.map((file) => (
            <Card
              key={file.name}
              style={{
                padding: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon style={{ transform: 'rotate(45deg)' }} fontSize="small" />
                &nbsp;{file.name}{' '}
              </p>
              <CloseIcon onClick={() => setUploadedFiles([])} />
            </Card>
          ))}
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.75rem' }}>
          <Button autoFocus onClick={handleClose} color="default" variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleUpload}
            color="default"
            variant="outlined"
            style={uploadButtonStyle}
            size="small"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUploadComponent;
