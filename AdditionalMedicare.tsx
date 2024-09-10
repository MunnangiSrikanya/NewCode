import React from 'react';
import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';

// Define types for columns used in TableComponent
interface Column {
  field: string;
}

const AdditionalMedicare: React.FC = () => {
  // Define the columns for the tables
  const columns: Column[] = [{ field: 'Carrier Name' }, { field: 'Line of Business' }, { field: 'Delete' }];

  const columnsTwo: Column[] = [{ field: 'File Name' }, { field: 'Effective Date' }, { field: 'Open Enrollment Date' }, { field: 'Delete' }];

  return (
    <div>
      <div>
        <FormControlLabel control={<Checkbox />} label='Apply to all Carriers' />
        <TableComponent columns={columns} />
      </div>
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <Grid item xs={4}>
          <DateComponent label='Effective Date' />
        </Grid>
        <Grid item xs={4}>
          <DateComponent label='Open Enrollment Date' />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel control={<Checkbox />} label='Apply Date to all Carriers' />
        </Grid>
      </Grid>
      <div style={{ marginBottom: '1rem' }}>
        <Button variant='contained' size='small' className='button' style={{ marginRight: '1rem' }}>
          Upload
        </Button>
        <TextField label='Please attach files in excel format' variant='filled' disabled style={{ width: '25%' }} size='small' />
      </div>
      <TableComponent columns={columnsTwo} />
    </div>
  );
};

export default AdditionalMedicare;
