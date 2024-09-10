import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DateComponent from './DateComponent';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography
} from '@material-ui/core';
import TableComponent from './TableComponent';
import { Autocomplete } from '@material-ui/lab';
import { ClientList } from './IntentList';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { ExpandMore } from '@material-ui/icons';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AttachFileIcon from '@material-ui/icons/AttachFile';
// Define a type for the column objects used in TableComponent
interface Column {
  field: string;
}
// Define the interface for the props
interface cmsbidprops {
  selectedFileType: string;
  setSelectedFileType: Dispatch<SetStateAction<string>>;
}
interface Client {
  AccountName: string;
  ResourceID: string;
}
interface options {
  carrierName: string;
  code: string;
}
const CmsBid: React.FC<cmsbidprops> = ({ selectedFileType, setSelectedFileType }) => {
  const carrierNames: options[] = [
    { carrierName: 'Centene EGWP', code: '2FKA' },
    { carrierName: 'Highest Acct MA Only', code: '3820' },
    { carrierName: 'BCBSWNY MAPD EGWP', code: '6332' },
    { carrierName: 'BSNENY MAPD EGWP', code: '6334' },
    { carrierName: 'BS NTHEASTERN NY ASO EGWP', code: '7496' }
  ];
  const [selectedCarrierName, setSelectedCarrierName] = useState<options | null>(null);
  interface Column {
    headerName: string;
    field: string;
  }

  // Create an array of columns with the Column type
  const columns: Column[] = [
    { headerName: 'Filename', field: 'Filename' },
    { headerName: 'Format', field: 'Format' },
    { headerName: 'Size', field: 'Size' },
    { headerName: 'Attachment', field: 'Attachment' }
  ];
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [selectedClientName, setSelectedClientName] = useState<Client | null>();
  const [selectedLine, setSelectedLine] = useState('--');
  interface FileData {
    name: string;
    size: number;
    type: string;
  }

  interface OpenMessage {
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
    severity: 'success' | 'error' | 'info' | 'warning';
    msg: string;
  }

  interface RowData {
    Filename: string;
    Format: string;
    Size: string;
    Attachment: string;
  }

  const [openFileDialog, setOpenFileDialog] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: ''
  });
  interface RowData {
    Filename: string;
    Format: string;
    Size: string;
    Attachment: string;
  }
  const [rowData, setRowData] = useState<RowData[]>([
    {
      Filename: 'CMS BID Form',
      Format: '.xls',
      Size: 'Maximum file size 2 MB',
      Attachment: 'Upload file'
    }
  ]);
  const [files, setFiles] = useState<File[]>([]);

  const handleClose = () => {
    setOpenFileDialog(false);
    setUploadedFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 20 * 1024 * 1024,
    onDrop: (files: File[]) => {
      setUploadedFiles(files);
    }
  } as DropzoneOptions);

  const handleUpload = () => {
    console.log(uploadedFiles);
    if (uploadedFiles.length > 0) {
      setFiles(uploadedFiles);
      setRowData([
        ...rowData,
        {
          Filename: (uploadedFiles[0]?.name).substring(0, (uploadedFiles[0]?.name).indexOf('.')),
          Format: (uploadedFiles[0]?.name).substring((uploadedFiles[0]?.name).indexOf('.')),
          Size: `File Size ${uploadedFiles[0]?.size}`,
          Attachment: 'Uploaded Successfully'
        }
      ]);
      setOpenFileDialog(false);
      setUploadedFiles([]);
      setOpenMessage({ ...openMessage, open: true, msg: 'File Uploaded Successfully!!' });
    }
  };

  const uploadButtonStyle = {
    backgroundColor: uploadedFiles.length > 0 ? '#035C67' : '',
    color: uploadedFiles.length > 0 ? 'white' : 'black',
    marginLeft: '1rem'
  };
  const handleCarrierNameChange = (event, newValue) => {
    setSelectedCarrierName(newValue);
  };
  useEffect(() => {
    if (selectedCarrierName?.carrierName === 'Centene EGWP') {
      console.log('hi i am inside useeffect');
      setSelectedLine('Medicare Employer Group EGWP');
    }
  }, [selectedCarrierName]);
  const fetchFileTypes = async ({ ResourceID }) => {
    const dataViewParameters = {
      dataViewParameters: {
        ResourceID,
        IsActive: true
      }
    };
    try {
      const resp = await PCore.getDataApiUtils().getData('D_AccountCaseTypes', dataViewParameters, 'app/polaris-ec');
      console.log(resp.data);
      if (resp) {
        console.log(
          resp.data.data.map(item => item?.CaseTypeDesc),
          resp
        );
        setFileTypes(resp.data.data.map(item => item?.CaseTypeDesc));
      }
    } catch (error) {
      console.error('Error fetching file types:', error);
    }
  };
  const handleClientNameChange = (event: React.ChangeEvent<{}>, value: Client | null) => {
    setSelectedClientName(value);
    fetchFileTypes({ ResourceID: value?.ResourceID });
  };

  const handleFileTypeChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedFileType(value || 'Select');
  };
  console.log(selectedLine);
  return (
    <div>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={12} sm={6} md={4}>
          <label>Client Name*</label>
          <Autocomplete
            value={selectedClientName}
            onChange={handleClientNameChange}
            options={ClientList || []}
            getOptionLabel={option => option.AccountName}
            renderInput={params => <TextField {...params} margin='normal' required variant='outlined' size='small' className='text-field' />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <label>Type of File*</label>
          <Autocomplete
            value={selectedFileType}
            onChange={handleFileTypeChange}
            options={fileTypes}
            getOptionLabel={option => option}
            renderInput={params => <TextField {...params} size='small' margin='normal' variant='outlined' required className='text-field' />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <label>Carrier Name*</label>
          <Autocomplete
            value={selectedCarrierName}
            onChange={handleCarrierNameChange}
            options={carrierNames}
            getOptionLabel={option => option.carrierName}
            renderOption={option => (
              <div>
                <p>{option.carrierName}</p>
                <p>{option.code}</p>
              </div>
            )}
            renderInput={params => <TextField {...params} size='small' margin='normal' variant='outlined' required className='text-field' />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <label>Line of Business</label>
          <br />
          <TextField required value={selectedLine} variant='outlined' size='small' style={{ width: '100%', marginTop: '8px' }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateComponent label='Effective Date*' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateComponent label='Open Enrollment Date' />
          <FormControlLabel control={<Checkbox />} label='Apply Date to all files' />
        </Grid>
      </Grid>
      <Accordion defaultExpanded>
        <AccordionSummary
          aria-controls='panel1a-content'
          id='panel1a-header'
          style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          <h2 className='reasearch-filters'>
            <ExpandMore fontSize='large' style={{ marginRight: 1 }} />
          </h2>
          <h2 className='reasearch-filters'>Upload files</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className='ag-theme-alpine' style={{ width: '100%' }}>
            <TableContainer style={{ border: '1px solid lightGray' }}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    {columns.map((column, index) => (
                      <TableCell key={index} style={{ borderRight: '1px solid lightGray', textAlign: 'center' }}>
                        {column.field}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((row, index) => (
                    <TableRow key={index}>
                      {columns.map(column => (
                        <TableCell key={column.field} style={{ borderRight: '1px solid lightGray', textAlign: 'center' }}>
                          {column.field === 'Attachment' ? (
                            row.Attachment === 'Uploaded Successfully' ? (
                              <p
                                style={{
                                  color: 'green',
                                  display: 'inline-flex',
                                  gap: '2px',
                                  backgroundColor: 'lightgreen',
                                  padding: '3px',
                                  margin: 0
                                }}
                              >
                                <CheckCircleOutlinedIcon /> {row.Attachment}
                              </p>
                            ) : (
                              <Button
                                onClick={() => setOpenFileDialog(true)}
                                style={{ textTransform: 'none', textDecoration: 'underline', color: '#035C67' }}
                              >
                                {row.Attachment}
                              </Button>
                            )
                          ) : (
                            row[column.field]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={openFileDialog}
        maxWidth='xs'
        fullWidth
        BackdropProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        <DialogTitle id='customized-dialog-title' style={{ padding: '1rem 1rem 0 1.5rem', margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' style={{ color: '#035C67', margin: 0 }}>
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
              Drag and drop files here or <span style={{ textDecoration: 'underline' }}>choose files</span>
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

          {uploadedFiles.map(file => (
            <Card key={file.name} style={{ padding: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                <AttachFileIcon style={{ transform: 'rotate(45deg)' }} fontSize='small' />
                &nbsp;{file.name}{' '}
              </p>
              <CloseIcon onClick={() => setUploadedFiles([])} />
            </Card>
          ))}
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.75rem' }}>
          <Button autoFocus onClick={handleClose} color='default' variant='outlined' size='small'>
            Cancel
          </Button>
          <Button autoFocus onClick={handleUpload} color='default' variant='outlined' style={uploadButtonStyle} size='small'>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
      {/* <FileUploadComponent text='Please upload CMS BID Long form in Excel format' /> */}
    </div>
  );
};

export default CmsBid;
