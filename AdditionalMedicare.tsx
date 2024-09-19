import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Divider, FormControlLabel, Grid, TextField } from '@material-ui/core';
import DateComponent from './DateComponent';
import TableComponent from './TableComponent';
import FileUploadComponent from './FileUploadComponent';
import UploadedFiles from './UploadedFiles';

// Define the type for the column objects
interface Column {
  headerName:string;
  field: string;
}
interface options {
  [key: string]: string;
  carrierName: string;
  code: string;
  lineofBusiness:string
}
// Define the columns with the type
const columns: Column[] = [{ headerName:'Carrier Name',field: 'carrierName' }, { headerName:'Line of Business',field: 'lineofBusiness' }];

const AdditionalMedicare: React.FC = () => {
  const [effectiveDate, setEffectiveDate] = useState<string>('');
  const [openEnrollmentDate, setOpenEnrollmentDate] = useState<string>('');
  const [applyToAll, setApplyToAll] = useState<boolean>(false);
  const [applyToAllCarriers, setApplyToAllCarriers] = useState<boolean>(false);
  const [rowData,setRowData]=useState<options[]>([]);([])
  const carrierNames: options[] = [
    { carrierName: 'Centene EGWP', code: '2FKA',lineofBusiness:'Medicare Employer Group EGWP' },
    { carrierName: 'Highest Acct MA Only', code: '3820',lineofBusiness:'Medicare Employer Group EGWP' },
    { carrierName: 'BCBSWNY MAPD EGWP', code: '6332',lineofBusiness:'Medicare MA-PD and PDP' },
    { carrierName: 'BSNENY MAPD EGWP', code: '6334',lineofBusiness:'Medicare Part-D' },
    { carrierName: 'BS NTHEASTERN NY ASO EGWP', code: '7496' ,lineofBusiness:'Medicare Part-D'},
  ];
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
  const handleApplyToAllCarriers = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyToAllCarriers(event.target.checked);
  };
  useEffect(()=>{
    if(applyToAllCarriers){
      setRowData(carrierNames);
    }else{
      setRowData([])
    }
  },[applyToAllCarriers])
  const handleDelete = (index: number) => {
    setRowData((prevData) => prevData.filter((_, i) => i !== index));
  };
  return (
    <div>
      <div >
        <TableComponent columns={columns} rowData={rowData} selectedFileType='' handleDelete={handleDelete}/>
        <FormControlLabel control={<Checkbox checked={applyToAllCarriers} onChange={handleApplyToAllCarriers}/>} label="Apply to all Carriers" style={{padding:'12px'}} />
      </div>
      <Grid container spacing={3} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        <Grid item xs={6}>
          <DateComponent label="Effective Date" handleDateChange={handleDateChange('EffectiveDate')}/>
        </Grid>
        <Grid item xs={6}>
          <DateComponent label="Open Enrollment Date" handleDateChange={handleDateChange('OpenEnrollmentDate')}/>
        </Grid>  
      </Grid>
      <FormControlLabel control={<Checkbox checked={applyToAll} onChange={handleApplyToAllChange}/>} label="Apply Date to all files"  style={{padding:'12px'}}/>
      <UploadedFiles applyToAll={applyToAll} effectiveDate={effectiveDate} openEnrollmentDate={openEnrollmentDate}/>
     
    </div>
  );
};

export default AdditionalMedicare;
