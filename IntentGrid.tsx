/* eslint-disable */
import React, { useState, useRef, MouseEvent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { Group, ViewModule, Refresh, GetApp, ArrowDropDown } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CreateIntent from './CreateIntent/CreateIntent';
import { Card, CardContent, Divider } from '@material-ui/core';
import IntentRequests from './IntentRequest';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
const MyIntents: React.FC = () => {
  const gridRef = useRef<AgGridReact | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [density, setDensity] = useState<'standard' | 'compact' | 'comfortable'>('standard');
  const [open, setOpen] = useState<boolean>(false);
  const [newIntentState, setNewIntentState] = useState<boolean>(false);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleDensityChange = (newDensity: 'standard' | 'compact' | 'comfortable') => {
    setDensity(newDensity);
    closeMenu();
  };

  const handleExport = () => {
    gridRef.current?.api.exportDataAsCsv();
  };

  const history = useHistory();
  const handleIntentClick = () => {
    setNewIntentState(true);
    history.push('intent/createintent');
  };

  const handleCloseIntent = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='ag-theme-alpine' style={{ height: '500px', width: '100%' }}>
        <Card style={{ backgroundColor: '#fff', padding: '10px' }}>
          <CardContent>
            <div style={{ display: 'flex' }}>
              <h2 className='intent-request-header'>My Intent Requests</h2>
              <Button variant='outlined' onClick={handleIntentClick} size='small' className='create-intent-button'>
                <AddCircleOutlineIcon />
                Create New Intent
              </Button>
            </div>
          </CardContent>
        </Card>
        <Divider />
        <Card className='intent-requests-card'>
          <CardContent>
            <IntentRequests />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyIntents;
