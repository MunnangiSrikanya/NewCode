import React, { useState } from 'react';
import { Button, Card, Checkbox, Divider, FormControlLabel, Grid, IconButton, TextField } from '@material-ui/core';
import SnackbarComponent from '../SnackbarComponent';
import { Autocomplete } from '@material-ui/lab';
import './CreateIntent.css';
import { ClientList } from './IntentList';
import AdditionalMedicare from './AdditionalMedicare';
import ClinicalSupplement from './ClinicalSupplement';
import CmsBid from './CmsBid';
import DateComponent from './DateComponent';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChevronLeft } from '@material-ui/icons';

interface Client {
  AccountName: string;
  ResourceID: string;
}

interface OpenMessage {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  severity: 'success' | 'error' | 'warning' | 'info';
  msg: string;
}
const Intent: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<string>('');
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [selectedClientName, setSelectedClientName] = useState<Client | null>(null);
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: ''
  });
  const renderContent = () => {
    switch (selectedFileType) {
      case 'Additional Medicare Intent':
        return <AdditionalMedicare />;
      case 'CMS BID':
        return <CmsBid selectedFileType={selectedFileType} setSelectedFileType={setSelectedFileType} />;
      case 'Clinical Supplements':
        return <ClinicalSupplement />;
      default:
        return null;
    }
  };
  const fullName = useSelector((state: any) => state.token.fullName);
  const nameParts = fullName.split(' ');
  const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];
  const handleClick = async () => {
    const payload: any = {
      ClientList: 'f21035a5-28da-4585-90a7-f05febfc514e',
      FileTypeNew: 'CMS BID',
      CarrierName: '0000',
      ClientDetails: {
        AccountInfo: { LOB: '' }
      }
    };

    try {
      const createCaseResponse = await PCore.getMashupApi().createCase('ESI-Cust-PolarisEP-Work-Intent', undefined, payload);
    } catch (error) {
      // // Log the full error for debugging
      // console.error('Error creating case:', error.message);
      // console.error('Error stack:', error.stack);
    }
  };

  const history = useHistory();
  const fetchFileTypes = async ({ ResourceID }) => {
    const dataViewParameters = {
      dataViewParameters: {
        ResourceID,
        IsActive: true
      }
    };
    try {
      const resp = await PCore.getDataApiUtils().getData('D_AccountCaseTypes', dataViewParameters, 'app/polaris-ec');

      if (resp) {
        setFileTypes(resp.data.data.map(item => item?.CaseTypeDesc));
      }
    } catch (error) {}
  };

  const handleClientNameChange = (event: React.ChangeEvent<{}>, value: Client | null) => {
    setSelectedClientName(value);
    fetchFileTypes({ ResourceID: value?.ResourceID });
  };

  const handleFileTypeChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedFileType(value || '');
  };

  return (
    <>
      <Card className='card'>
        <div className='submit-intent-card-header'>
          <h2 style={{ color: '#035C67' }}>
            <IconButton
              onClick={() => {
                history.push('/intent');
              }}
            >
              <ChevronLeft />
            </IconButton>{' '}
            Create New Intent
          </h2>
        </div>
        <Divider />
        <Card className={selectedFileType === 'CMS BID' ? 'cms-bid-card' : 'main-card'}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <span
              style={{
                backgroundColor: '#035C67',
                borderRadius: '50%',
                color: 'white',
                padding: '10px 14px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginRight: '1rem'
              }}
            >
              {initials}
            </span>
            <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Submit Request</span>
          </div>
          {selectedFileType !== 'CMS BID' && (
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={12} sm={6} md={6}>
                <label>Client Name*</label>
                <Autocomplete
                  value={selectedClientName}
                  onChange={handleClientNameChange}
                  options={ClientList || []}
                  getOptionLabel={option => option.AccountName}
                  renderInput={params => (
                    <TextField
                      {...params}
                      // label="Client Name"
                      margin='normal'
                      required
                      variant='outlined'
                      size='small'
                      className='text-field'
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <label>Type of File*</label>
                <Autocomplete
                  value={selectedFileType}
                  onChange={handleFileTypeChange}
                  options={fileTypes}
                  getOptionLabel={option => option}
                  renderInput={params => (
                    <TextField
                      {...params}
                      // label="Type of File"
                      size='small'
                      margin='normal'
                      variant='outlined'
                      required
                      className='text-field'
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}
          {renderContent()}
          <div style={{ marginTop: '1rem' }}>
            {!selectedFileType && (
              <Grid container spacing={3} className='grid-create'>
                <Grid item xs={12} sm={6} md={6}>
                  <DateComponent label='Effective Date*' />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <DateComponent label='Open Enrollment Date' />
                  <FormControlLabel control={<Checkbox />} label='Apply Date to all files' />
                </Grid>
              </Grid>
            )}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <Button
                variant='outlined'
                size='small'
                className='cancel-button'
                onClick={() => {
                  history.push('/intent');
                }}
              >
                Cancel
              </Button>
              <Button variant='contained' size='small' className='button' onClick={handleClick}>
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </Card>
      <SnackbarComponent
        open={openMessage.open}
        severity={openMessage.severity}
        onClose={() => setOpenMessage({ ...openMessage, open: false })}
        message={openMessage.msg}
        vertical='top'
        horizontal='right'
      />
    </>
  );
};

export default Intent;
