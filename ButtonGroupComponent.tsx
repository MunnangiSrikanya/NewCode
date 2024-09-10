import React, { useState, MouseEvent } from 'react';
import { Button, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import WidgetsOutlinedIcon from '@material-ui/icons/WidgetsOutlined';
import ListOutlinedIcon from '@material-ui/icons/ViewList';
import { ExpandMore } from '@material-ui/icons';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import SystemUpdateAltRoundedIcon from '@material-ui/icons/SystemUpdateAltRounded';

// Define the props type
interface ButtonGroupComponentProps {
  setPageCard: React.Dispatch<React.SetStateAction<number>>;
  setPageTable: React.Dispatch<React.SetStateAction<number>>;
  alignment: 'tableView' | 'gridView';
  setAlignment: React.Dispatch<React.SetStateAction<'tableView' | 'gridView'>>;
}

const useStyles = makeStyles(() => ({
  tabButton: {
    borderRadius: 0,
    textTransform: 'none',
    backgroundColor: 'lightgray',
    width: '25px',
    height: '27px',
    padding: '0',
    minWidth: 'unset',
    '&:last-child': {
      marginRight: 0
    },
    '&.active': {
      backgroundColor: '#035C67',
      color: '#fff',
      fontWeight: 'bold'
    },
    '&:hover': {
      backgroundColor: '#035C67'
    }
  },
  tabButtonIcon: {
    fontSize: '0.875rem !important'
  }
}));

const ButtonGroupComponent: React.FC<ButtonGroupComponentProps> = ({ setPageCard, setPageTable, alignment, setAlignment }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: 'tableView' | 'gridView') => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
    setPageTable(1);
    setPageCard(1);
  };

  return (
    <div className='buttons-div'>
      <Button variant='text' className='button-group' endIcon={<ExpandMore />} onClick={handleClick} size='small'>
        Default view
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <AddCircleOutlineOutlinedIcon /> &nbsp;Create New View
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PermIdentityOutlinedIcon /> &nbsp;My View 1
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PermIdentityOutlinedIcon /> &nbsp;My View 2
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PermIdentityOutlinedIcon /> &nbsp;My View 3
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PermIdentityOutlinedIcon /> &nbsp;My View 4
        </MenuItem>
      </Menu>
      <Button variant='text' className='button-group'>
        Export
        <SystemUpdateAltRoundedIcon />
      </Button>
      <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label='text alignment'>
        <ToggleButton value='tableView' aria-label='table view' className={`${classes.tabButton}${alignment === 'tableView' ? ' active' : ''}`}>
          <WidgetsOutlinedIcon className={`${classes.tabButtonIcon}`} />
        </ToggleButton>
        <ToggleButton value='gridView' aria-label='grid view' className={`${classes.tabButton}${alignment === 'gridView' ? ' active' : ''}`}>
          <ListOutlinedIcon className={`${classes.tabButtonIcon}`} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ButtonGroupComponent;
