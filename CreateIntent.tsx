import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from '@material-ui/core';
import SnackbarComponent from '../SnackbarComponent';
import { Autocomplete } from '@material-ui/lab';
import './CreateIntent.css';
import { ClientList } from './IntentList';
import AdditionalMedicare from './AdditionalMedicare';
import ClinicalSupplement from './ClinicalSupplement';
import CmsBid from './CmsBid';
import DateComponent from './DateComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChevronLeft, ExpandMore, Height } from '@material-ui/icons';
import axios from 'axios';
import FileUploadComponent from './FileUploadComponent';
import FileActions from '../../Actions/FileActions';
import PDL from './PDL';

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
interface MyComponentProps {
  setNewIntentState: Dispatch<SetStateAction<boolean>>;
}
const Intent: React.FC<MyComponentProps> = ({ setNewIntentState }) => {
  const [selectedFileType, setSelectedFileType] = useState<string>('');
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [selectedClientName, setSelectedClientName] = useState<Client | null>(null);
  const [effectiveDate, setEffectiveDate] = useState<string>('');
  const [openEnrollmentDate, setOpenEnrollmentDate] = useState<string>('');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [selectedState, setSelectedState] = useState<string |null>('');
  const [openMessage, setOpenMessage] = useState<OpenMessage>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    msg: '',
  });
  const renderContent = () => {
    switch (selectedFileType) {
      case 'Additional Medicare Intent':
        return <AdditionalMedicare />;
      case 'CMS BID':
        return (
          <CmsBid selectedFileType={selectedFileType} setSelectedFileType={setSelectedFileType} />
        );
      case 'PDL':
        return (
          <PDL
            selectedClientName={selectedClientName}
            handleClientNameChange={handleClientNameChange}
            selectedFileType={selectedFileType}
            handleFileTypeChange={handleFileTypeChange}
            fileTypes={fileTypes}
            ClientList={ClientList}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        );
      case 'Clinical Supplements':
        return <ClinicalSupplement />;
      default:
        return null;
    }
  };
  const fullName = 'SM';
  const nameParts = fullName.split(' ');
  const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];
  const handleClick = async () => {
    const payload: any = {
      ClientList: 'f21035a5-28da-4585-90a7-f05febfc514e',
      FileTypeNew: 'CMS BID',
      CarrierName: '0000',
      ClientDetails: {
        AccountInfo: { LOB: '' },
      },
    };

    // try {
    //   const createCaseResponse = await PCore.getMashupApi().createCase('ESI-Cust-PolarisEP-Work-Intent', undefined, payload);
    // } catch (error) {
    //   // // Log the full error for debugging
    //   // console.error('Error creating case:', error.message);
    //   // console.error('Error stack:', error.stack);
    // }
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const fetchFileTypes = async () => {
    try {
      // const resp = await PCore.getDataApiUtils().getData(
      //   'D_AccountCaseTypes',
      //   '{"dataViewParameters":{"ResourceID":"b7c2bdf4-3031-4b3d-ad35-135030a4fb33","IsActive":"true"}}',
      //   'app/polaris-ec'
      // );
      const resp = await axios.get('https://mocki.io/v1/d8348fd4-0fb5-4b8d-91f0-080f80b9e4a5');
      console.log(resp.data);
      if (resp) {
        setFileTypes(resp.data.map((item: { TypeName: any }) => item?.TypeName));
      }
    } catch (error) {
      console.error('Error fetching file types:', error);
    }
  };

  const handleClientNameChange = (event: React.ChangeEvent<{}>, value: Client | null) => {
    setSelectedClientName(value);
    fetchFileTypes();
  };
  console.log(fileTypes, 'fileTypes');
  const handleFileTypeChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    setSelectedFileType(value || '');
    dispatch(FileActions.clearFiles());
  };
  const handleApplyToAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyToAll(event.target.checked);
  };
  const handleDateChange =
    (field: 'EffectiveDate' | 'OpenEnrollmentDate') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (field === 'EffectiveDate') {
        setEffectiveDate(value);
      } else {
        setOpenEnrollmentDate(value);
      }
    };
  return (
    <>
      <Card className="card">
        <div className="submit-intent-card-header">
          <h2 style={{ color: '#035C67' }}>Create New Intent</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>CI-6499</p>
            <p style={{ color: '#035C67' }}>Created:ESI 1 min ago | Updated:ESI 1 min ago</p>
          </div>
        </div>
        <Divider />
        <Grid container>
          <Grid item xs={9}>
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
                    marginRight: '1rem',
                  }}
                >
                  {initials}
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Submit Request</span>
              </div>

              <div>
                {selectedFileType !== 'PDL' && (
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={6} md={6}>
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
                    <Grid item xs={12} sm={6} md={6}>
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
                  </Grid>
                )}

                {renderContent()}
                {!selectedFileType && (
                  <>
                    <Grid container spacing={3} className="grid-create">
                      <Grid item xs={12} sm={6} md={6}>
                        <DateComponent
                          label="Effective Date*"
                          handleDateChange={handleDateChange('EffectiveDate')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <DateComponent
                          label="Open Enrollment Date"
                          handleDateChange={handleDateChange('OpenEnrollmentDate')}
                        />
                      </Grid>
                    </Grid>
                    <FormControlLabel
                      control={<Checkbox checked={applyToAll} onChange={handleApplyToAllChange} />}
                      label="Apply Date to all files"
                      style={{ padding: '12px' }}
                    />
                  </>
                )}
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div
                  style={{
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    className="cancel-button"
                    onClick={() => {
                      history.push('/intent');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" size="small" className="button" onClick={handleClick}>
                    Submit
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <div
              style={{
                margin: '2rem 2rem 0 0',
                border: '1px solid lightgray',
                height: 'auto',
                borderRadius: '1.5rem',
                boxShadow: 'none',
                padding: '1rem',
              }}
            >
              <div>
                <h2 className="reasearch-filters">Upload files</h2>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: '2rem',
                }}
              >
                {selectedState === 'TX' ? (
                  <div>
                    <FileUploadComponent
                      text='Please upload file name starts with `ACSPPDL` in .txt format.Max 1 file can be attached.'
                      
                    />
                    <Divider/>
                    <FileUploadComponent
                      text='Please upload file name starts with `ACSPTFF` in .txt format.Max 1 file can be attached.'
                    />
                    <Divider/>
                    <FileUploadComponent
                      text='Please upload file name starts with `ACSPDEL` in .txt format.Max 1 file can be attached.'
                    />
                    <Divider/>
                    <FileUploadComponent
                      text='Please upload all other documents including supplemental.'
                    />
                  </div>
                ) : (
                  <FileUploadComponent
                    text={
                      selectedFileType === 'CMS BID'
                        ? 'Please upload CMS BID long form in.xlsx format'
                        : 'Please upload file in xlsx format'
                    }
                  />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
      <SnackbarComponent
        open={openMessage.open}
        severity={openMessage.severity}
        onClose={() => setOpenMessage({ ...openMessage, open: false })}
        message={openMessage.msg}
        vertical="top"
        horizontal="right"
      />
    </>
  );
};

export default Intent;
