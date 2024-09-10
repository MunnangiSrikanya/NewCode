/* eslint-disable */
import React, { useState, ChangeEvent } from 'react';
import DateComponent from './DateComponent';
import { Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField } from '@material-ui/core';
import TableComponent from './TableComponent';

// Define types for the states
interface FileType {
  type: string;
}

interface Code {
  code: string;
}

interface Column {
  field: string;
}

const ClinicalSupplement: React.FC = () => {
  // Define columns for TableComponent
  const columns: Column[] = [{ field: 'Carrier Name' }, { field: 'Line of Business' }, { field: 'Delete' }];

  // Initialize state with appropriate types
  const [clinicalFileTypes, setClinicalFileTypes] = useState<FileType[]>([{ type: 'type 1' }, { type: 'type 2' }, { type: 'type 3' }]);

  const [codes, setCodes] = useState<Code[]>([{ code: 'code 1' }, { code: 'code 2' }, { code: 'code 3' }]);

  const [selectedFileType, setSelectedFileType] = useState<string>('Select');
  const [selectedCode, setSelectedCode] = useState<string>('Select');

  // Type the event parameter
  const handleFileTypeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedFileType(e.target.value as string);
  };

  const handleCodeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setSelectedCode(e.target.value as string);
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <TextField
            select
            label='State Code'
            size='small'
            margin='normal'
            variant='outlined'
            value={selectedCode}
            onChange={handleCodeChange}
            className='text-field'
          >
            <MenuItem value='Select'>Select</MenuItem>
            {codes.map(c => (
              <MenuItem key={c.code} value={c.code}>
                {c.code}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <TextField
            select
            label='Clinical File Type'
            size='small'
            margin='normal'
            variant='outlined'
            value={selectedFileType}
            onChange={handleFileTypeChange}
            className='text-field'
          >
            <MenuItem value='Select'>Select</MenuItem>
            {clinicalFileTypes.map(fileType => (
              <MenuItem key={fileType.type} value={fileType.type}>
                {fileType.type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <FormControlLabel control={<Checkbox />} label='Apply to all Carriers' />
      <TableComponent columns={columns} />
      <div style={{ margin: '1rem 0rem' }}>
        <DateComponent label='Effective Date' />
      </div>
      <div>
        <Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
        </Button>
        <TextField label='Please attach files in excel format' variant='filled' disabled style={{ width: '25%' }} size='small' />
      </div>
    </div>
  );
};

export default ClinicalSupplement;
