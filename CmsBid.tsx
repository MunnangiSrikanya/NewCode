import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DateComponent from './DateComponent';
import { Checkbox, Divider, FormControlLabel, Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import UploadedFiles from './UploadedFiles';

interface cmsbidprops {
  selectedFileType: string;
  setSelectedFileType: Dispatch<SetStateAction<string>>;
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
    { carrierName: 'BS NTHEASTERN NY ASO EGWP', code: '7496' },
  ];
  const [effectiveDate, setEffectiveDate] = useState<string>('');
  const [openEnrollmentDate, setOpenEnrollmentDate] = useState<string>('');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [selectedCarrierName, setSelectedCarrierName] = useState<options | null>(null);

  const [selectedLine, setSelectedLine] = useState('--');

  const handleCarrierNameChange = (event: any, newValue: any) => {
    setSelectedCarrierName(newValue);
  };
  useEffect(() => {
    if (selectedCarrierName?.carrierName === 'Centene EGWP') {
      console.log('hi i am inside useeffect');
      setSelectedLine('Medicare Employer Group EGWP');
    }
  }, [selectedCarrierName]);
  const handleApplyToAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyToAll(event.target.checked);
  };
  const handleDateChange = (field: 'EffectiveDate' | 'OpenEnrollmentDate') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (field === 'EffectiveDate') {
      setEffectiveDate(value);
    } else {
      setOpenEnrollmentDate(value);
    }
  };
  return (
    <div>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <label>Carrier Name*</label>
          <Autocomplete
            value={selectedCarrierName}
            onChange={handleCarrierNameChange}
            options={carrierNames}
            getOptionLabel={(option) => option.carrierName}
            renderOption={(option) => (
              <div>
                <p>{option.carrierName}</p>
                <p>{option.code}</p>
              </div>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                margin="normal"
                variant="outlined"
                required
                className="text-field"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label>Line of Business</label>
          <br />
          <TextField
            required
            value={selectedLine}
            variant="outlined"
            size="small"
            style={{ width: '100%', marginTop: '8px' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <DateComponent label="Effective Date*" handleDateChange={handleDateChange('EffectiveDate')}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateComponent label="Open Enrollment Date" handleDateChange={handleDateChange('OpenEnrollmentDate')}/>
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox checked={applyToAll} onChange={handleApplyToAllChange} />}
        label="Apply Date to all files"
        style={{ padding: '12px' }}
      />

      <UploadedFiles applyToAll={applyToAll} effectiveDate={effectiveDate} openEnrollmentDate={openEnrollmentDate}/>
    </div>
  );
};

export default CmsBid;
