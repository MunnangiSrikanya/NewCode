/* eslint-disable */
import React from 'react';
import DateComponent from './DateComponent';
import { Button, Grid } from '@material-ui/core';

// Define a type for any props that the component might receive.
// In this case, there are no props, so we use an empty object.
type SelectTypeProps = {};
const handleClick = async () => {
  const content: any = {
    caseTypeID: 'ESI-Cust-Polaris-Work-Process-Intent',
    content: {
      ClientList: 'f21035a5-28da-4585-90a7-f05febfc514e',
      FileTypeNew: 'CMS BID',
      CarrierName: '0000',
      ClientDetails: { AccountInfo: { LOB: '' } }
    }
  };
  const creatcase = await PCore.getMashupApi().createCase('ESI-Cust-Polaris-Work-Process-Intent', '', content);
  if (creatcase) {
    console.log(creatcase, 'Case Created');
  }
};
const SelectType: React.FC<SelectTypeProps> = () => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <Grid container spacing={3} alignItems='center'>
        <Grid item xs={6}>
          <DateComponent label='Effective Date' />
        </Grid>
        <Grid item xs={6}>
          <DateComponent label='Open Enrollment Date' />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <Grid item xs={3}>
          <Button variant='outlined' size='small' className='cancel-button'>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' size='small' className='button' onClick={handleClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectType;
