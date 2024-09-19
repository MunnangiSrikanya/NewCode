import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import DateComponent from './DateComponent';
import UploadedFiles from './UploadedFiles';
import TableComponent from './TableComponent';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete'
interface Client {
  AccountName: string;
  ResourceID: string;
}
interface pdlprops {
  selectedFileType: string;
  selectedClientName: Client | null;
  fileTypes: string[];
  ClientList: Client[];
  selectedState: string | null;
  setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileTypeChange: (event: React.ChangeEvent<{}>, value: string | null) => void;
  handleClientNameChange: (event: React.ChangeEvent<{}>, value: Client | null) => void;
}
interface options {
  [key: string]: string;
  carrierName: string;
  code: string;
  lineofBusiness: string;
}
interface Column {
  headerName: string;
  field: string;
}
const columns: Column[] = [
  { headerName: 'Carrier Name', field: 'carrierName' },
  { headerName: 'Line of Business', field: 'lineofBusiness' },
];
const uploadedFileColumns: Column[] = [
  { headerName: 'File Name', field: 'fileName' },
  { headerName: 'Category', field: 'category' },
];
interface FileData{
    [key: string]: string;
    fileName:string;
    category:string
}
const PDL: React.FC<pdlprops> = ({
  ClientList,
  fileTypes,
  handleFileTypeChange,
  selectedFileType,
  handleClientNameChange,
  selectedClientName,
  setSelectedState,
  selectedState,
}) => {
  const stateCodes = ['TX'];

  const [effectiveDate, setEffectiveDate] = useState<string>('');
  const [ftpDate, setFtpDate] = useState<string>('');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [rowData, setRowData] = useState<options[]>([]);
  const [fileData,setFileData]=useState<FileData[]>([]);
  [];
  const handleStateCodeChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedState(value);
  };
  useEffect(() => {
    if (selectedState) {
      setRowData([
        {
          carrierName: '1234test',
          code: '1234',
          lineofBusiness: 'MediCaid',
        },
      ]);
    } else {
      setRowData([]);
    }
  }, [selectedState]);
  const uploadedFiles = useSelector((state: any) => state?.file?.uploadedFiles);

  useEffect(() => {
    const currentCount = fileData.length;
    const formattedData: FileData[] = uploadedFiles.map((file: any,index:number) => ({
        fileName: file.name,
        category: `TX_${String(currentCount + index + 1).padStart(3, '0')}`,
        
    }));
    setFileData(prev=>[...prev,...formattedData]);
  }, [uploadedFiles]);

  const handleDateChange =
    (field: 'EffectiveDate' | 'FTPFile') => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (field === 'EffectiveDate') {
        setEffectiveDate(value);
      } else {
        setFtpDate(value);
      }
    };
  const handleApplyToAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyToAll(event.target.checked);
  };
  const handleDelete = (index: number) => {
    setFileData((prevData) => prevData.filter((_, i) => i !== index));
  };
  const handleDeleteCarriers = (index: number) => {
    setRowData((prevData) => prevData.filter((_, i) => i !== index));
  };
console.log(fileData)
  return (
    <div>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4} md={4}>
          <label>Client Name*</label>
          <Autocomplete
            value={selectedClientName}
            onChange={handleClientNameChange}
            options={ClientList || []}
            getOptionLabel={(option) => option.AccountName}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Client Name"
                margin="normal"
                required
                variant="outlined"
                size="small"
                className="text-field"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <label>Type of File*</label>
          <Autocomplete
            value={selectedFileType}
            onChange={handleFileTypeChange}
            options={fileTypes}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Type of File"
                size="small"
                margin="normal"
                variant="outlined"
                required
                className="text-field"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <label>State Code*</label>
          <Autocomplete
            value={selectedState}
            onChange={handleStateCodeChange}
            options={stateCodes || []}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Client Name"
                margin="normal"
                required
                variant="outlined"
                size="small"
                className="text-field"
              />
            )}
          />
        </Grid>
      </Grid>
      <TableComponent columns={columns} rowData={rowData} selectedFileType={selectedFileType} handleDelete={handleDeleteCarriers}/>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <DateComponent
            label="Effective Date*"
            handleDateChange={handleDateChange('EffectiveDate')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateComponent
            label="File Recieved from FTP*"
            handleDateChange={handleDateChange('FTPFile')}
          />
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox checked={applyToAll} onChange={handleApplyToAllChange} />}
        label="Apply Date to all files"
        style={{ padding: '12px' }}
      />
      {selectedState && (
        <TableContainer style={{ border: '1px solid lightGray' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {uploadedFileColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    style={{  textAlign: 'center' }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fileData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={uploadedFileColumns.length}
                    style={{ textAlign: 'center' }}
                  >
                    No data
                  </TableCell>
                </TableRow>
              ) : (
                fileData.map((row, index) => (
                  <TableRow key={index}>
                    {uploadedFileColumns.map((column) => (
                      <TableCell
                        key={column.field}
                        style={{  textAlign: 'center' }}
                      >
                        {row[column.field]}
                      </TableCell>
                    ))}
                    <TableCell style={{ textAlign: 'center' }}>
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PDL;
