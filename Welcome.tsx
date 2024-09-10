/* eslint-disable */
import * as React from 'react';
import { Button, Grid, Paper, TextField, Typography, AppBar, InputAdornment, Box } from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { useSelector } from 'react-redux';
import WarningMessageComponent from '../Header/WarningMessage';
const NavBar: React.FC = () => {
  const columns: ColDef[] = [
    { field: 'id', headerName: 'Case ID' },
    { field: 'RequestDetails', headerName: 'Request Details' },
    { field: 'CreatedBy', headerName: 'Created By' }
  ];

  const fullName = useSelector((state: any) => state.token.fullName);
  const nameParts = fullName.split(' ');
  const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];

  const rows = [
    { id: 'U45687345678', RequestDetails: 'U45687345678', CreatedBy: 'Deepika Sharma' },
    { id: 'U45687345679', RequestDetails: 'U45687345678', CreatedBy: 'Deepika Sharma' }
  ];
  return (
    <>
      <WarningMessageComponent showWarning={true} />
      <Grid container spacing={3} className='main-content'>
        <Grid item xs={12} md={6}>
          <Paper className='welcome-section' style={{ padding: '12px' }}>
            <Typography variant='h6' style={{ color: '#035C67' }}>
              Welcome, {fullName}!
            </Typography>
            <br />
            <Typography variant='body1' style={{ color: '#035C67' }}>
              <strong>Good morning.</strong> Get health support from anywhere with Crossover Health
            </Typography>
            <div className='welcome-image' style={{ display: 'flex', justifyContent: 'space-around' }}>
              <img src='assets\img\LandingDocImg.svg' alt='Welcome' style={{ display: 'flex', justifyContent: 'space-around' }} />
            </div>
            <br />
            <div style={{ color: '#035C67' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button style={{ backgroundColor: '#035C67', color: 'white' }}>See what's New</Button>
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className='tasks-section' style={{ padding: '16px', marginBottom: '10px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    backgroundColor: '#035C67 ',
                    marginRight: '0.5rem',
                    borderRadius: '22px',
                    color: 'white',
                    padding: '8px 8px',
                    fontSize: 'small'
                  }}
                >
                  {initials}
                </span>
                <Typography variant='h6' style={{ color: '#035C67' }}>
                  Tasks
                </Typography>
              </Box>
              <Button style={{ color: '#035C67', textTransform: 'capitalize', textDecoration: 'underline' }}>View More</Button>
            </Box>
            <div className='task-item'>
              <Typography variant='body1' style={{ color: '#035C67' }}>
                <b>Capture Intake data</b>
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2'>
                  In <span style={{ color: '#035C67' }}>Copay Waiver (CC-153205)</span> &bull; Urgency 100{' '}
                </Typography>
                <Button variant='contained' style={{ backgroundColor: '#035C67', color: 'white' }}>
                  Go
                </Button>
              </div>
            </div>
            <hr />
            <div className='task-item'>
              <Typography variant='body1' style={{ color: '#035C67' }}>
                <b>Create Process</b>
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2'>
                  In <span style={{ color: '#035C67' }}>Manage Process (M-2047)</span> &bull; Urgency 10
                </Typography>
                <Button variant='contained' style={{ backgroundColor: '#035C67', color: 'white' }}>
                  Go
                </Button>
              </div>
            </div>
            <hr />
          </Paper>

          <Paper className='followed-items-section' style={{ padding: '16px', marginBottom: '10px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    backgroundColor: '#035C67',
                    borderRadius: '22px',
                    color: 'white',
                    padding: '8px 8px',
                    marginRight: '0.5rem'
                  }}
                >
                  {initials}
                </span>
                <Typography variant='h6' style={{ color: '#035C67' }}>
                  My followed items
                </Typography>
              </Box>
              <Button style={{ color: '#035C67', textTransform: 'capitalize', textDecoration: 'underline' }}>View More</Button>
            </Box>
            <br />
            <div style={{ height: 150 }} className='ag-theme-alpine'>
              <AgGridReact rowData={rows} columnDefs={columns} pagination={false} />
            </div>
          </Paper>

          <Paper className='pulse-section' style={{ padding: '16px' }}>
            <div style={{ display: 'flex', marginBottom: '1rem' }}>
              <span
                style={{
                  backgroundColor: '#035C67 ',
                  marginRight: '0.5rem',
                  borderRadius: '22px',
                  color: 'white',
                  padding: '8px 8px'
                }}
              >
                {initials}
              </span>
              <Typography variant='h6' style={{ color: '#035C67' }}>
                Pulse
              </Typography>
            </div>
            {/* <Button variant="contained">JB</Button> */}
            <TextField
              variant='outlined'
              placeholder='Start a conversation'
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <span
                      style={{
                        backgroundColor: '#035C67 ',
                        marginRight: '0.5rem',
                        borderRadius: '22px',
                        color: 'white',
                        padding: '9px 8px'
                      }}
                    >
                      {initials}
                    </span>
                  </InputAdornment>
                )
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant='contained' style={{ marginRight: '1rem', backgroundColor: '#035C67', color: 'white' }}>
                Send
              </Button>
              <Button variant='contained' style={{ backgroundColor: '#035C67', color: 'white' }}>
                <AttachFile />
                Attach file
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default NavBar;
