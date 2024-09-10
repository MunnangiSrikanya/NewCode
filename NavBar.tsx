/* eslint-disable */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Menu, MenuItem, Typography, Box } from '@material-ui/core';
import { useHistory, useLocation, Route, Switch, Redirect } from 'react-router-dom';
import IntentGrid from '../Intent/IntentGrid';
import NavBar from '../Welcome/Welcome';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';
import WarningMessageComponent from '../Header/WarningMessage';
// Lazy load Header

const MenuTabs: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  // State for menu anchor element
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Handler for opening the menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handler for clicking menu items
  const handleMenuItemClick = (path: string) => {
    history.push(path);
    setAnchorEl(null);
    console.log(path);
  };
  // Handler for closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to determine if a route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <Box bgcolor='background.paper' width='100%' className='navbar'>
      <AppBar
        position='static'
        style={{
          backgroundColor: '#3EFFC0',
          color: 'black',
          padding: 0,
          minHeight: 'auto'
        }}
      >
        <Toolbar
          style={{
            padding: 0,
            minHeight: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => handleMenuItemClick('/portal')}
            style={{
              color: isActive('/portal') ? 'black' : 'inherit',
              backgroundColor: isActive('/portal') ? 'white' : 'inherit',
              marginRight: '15px',
              borderBottom: isActive('/portal') ? '2.5px solid #035C67' : 'none',
              borderRadius: 0,
              padding: '8px 16px',
              minHeight: 'auto'
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => handleMenuItemClick('/intent')}
            style={{
              color: isActive('/intent') ? 'black' : 'inherit',
              backgroundColor: isActive('/intent') ? 'white' : 'inherit',
              marginRight: '15px',
              borderBottom: isActive('/intent') ? '2.5px solid #035C67' : 'none',
              borderRadius: 0,
              padding: '8px 16px',
              minHeight: 'auto'
            }}
          >
            Intent
          </Button>
          <Button
            onClick={() => handleMenuItemClick('/ticket')}
            style={{
              color: isActive('/ticket') ? 'black' : 'inherit',
              backgroundColor: isActive('/ticket') ? 'white' : 'inherit',
              marginRight: '15px',
              borderBottom: isActive('/ticket') ? '2.5px solid #035C67' : 'none',
              borderRadius: 0,
              padding: '8px 16px',
              minHeight: 'auto'
            }}
          >
            Ticket
          </Button>
          <Button
            aria-controls='case-search-menu'
            aria-haspopup='true'
            onClick={handleMenuClick}
            style={{
              color: isActive('/case-search') || isActive('/case-search/submenu') ? 'black' : 'inherit',
              backgroundColor: isActive('/case-search') || isActive('/case-search/submenu') ? 'white' : 'inherit',
              marginRight: '15px',
              borderBottom: isActive('/case-search') || isActive('/case-search/submenu') ? '2.5px solid #035C67' : 'none',
              borderRadius: 0,
              padding: '8px 16px',
              minHeight: 'auto'
            }}
          >
            Case Search
          </Button>
          <Menu id='case-search-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleMenuItemClick('/case-search')}>Case Search</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/case-search/submenu')}>Submenu for Case Search</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {/* <Box p={3}>
        <React.Suspense fallback={<Typography>Loading Header...</Typography>}>
          <Switch>
            <Route exact path='/portal' component={NavBar} />
            <Route path='/intent' component={IntentGrid} />
            <Route path='/ticket' render={() => <Typography>Ticket</Typography>} />
            <Route path='/case-search' render={() => <Typography>Case Search</Typography>} />
            <Route path='/case-search/submenu' render={() => <Typography>Submenu for Case Search</Typography>} />
            <Redirect from='/' to='/portal' />
          </Switch>
        </React.Suspense>
      </Box> */}
    </Box>
  );
};

export default MenuTabs;
