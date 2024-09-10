/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Badge, ClickAwayListener, Tooltip, Button, makeStyles, Divider } from '@material-ui/core';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { getMessages } from '../Services/MockServices';
import './Header.css'; // Make sure this file exists and has correct styles
import NavBar from '../navigation/NavBar';

// Define the type for a message
interface Message {
  id: string;
  from: string;
  subject: string;
  read: boolean;
  pinned: boolean;
}

const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: '#333',
    fontSize: '0.75rem',
    padding: '0',
    border: '1px solid #ddd',
    width: '18rem'
  },
  arrow: {
    color: 'white'
  }
}));

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const classes = useStyles();
  const history = useHistory();
  const fullName = useSelector((state: any) => state.token.fullName);
  const nameParts = fullName.split(' ');
  const initials = nameParts.length >= 2 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0][0];
  const { authState, oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      oktaAuth.tokenManager.get('idToken').then(idToken => {
        for (const key in idToken) {
          dispatch({ type: 'STORE_ID_TOKEN', payload: idToken['idToken'] });
          dispatch({ type: 'STORE_FULLNAME', payload: idToken['claims'].fullName });
        }
      });
    }
  }, [authState, oktaAuth, dispatch]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleMessages = async () => {
    setOpen(true);
    try {
      const resp = await getMessages();
      setMessages(resp.data || []);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const handleAllNotifications = () => {
    setOpen(false);
    history.push('portal/Messages', { state: { messages } });
  };

  const filteredMessages = messages.slice(0, 4);

  return (
    <div className='dashboard'>
      <AppBar position='static' style={{ backgroundColor: '#035C67' }}>
        <Toolbar style={{ minHeight: '50px' }}>
          <Typography variant='h6' className='logo' style={{ color: '#3EFFC0', marginLeft: '1px' }}>
            EVERNORTH
          </Typography>
          {/* <Typography variant='h5' style={{ paddingTop: '2px' }}>
            Polaris Client Portal
          </Typography> */}
          <Box flexGrow={1} />
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
              <Tooltip
                PopperProps={{ disablePortal: true }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                interactive
                title={
                  <div className={classes.tooltip}>
                    <div style={{ color: '#035C67', display: 'flex', justifyContent: 'space-between', margin: '0 1rem' }}>
                      <h3>Notifications</h3>
                      <Button onClick={handleAllNotifications} style={{ textTransform: 'none' }}>
                        Mark all as Read
                      </Button>
                    </div>
                    <Divider />
                    {filteredMessages.map(item => (
                      <React.Fragment key={item.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {item.read ? <DraftsOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                            <div>
                              <p style={{ margin: 0 }}>From {item.from}</p>
                              <p style={{ margin: 0 }}>{item.subject}</p>
                            </div>
                          </div>
                          {item.pinned && <img src='/assets/img/iconoir--pin.svg' alt='pinIcon' width='auto' height='auto' />}
                          <img src='/assets/img/mi--delete.svg' alt='deleteIcon' width='auto' height='auto' />
                        </div>
                        <Divider />
                      </React.Fragment>
                    ))}
                    <Button
                      style={{ textTransform: 'none', backgroundColor: '#035C67', color: 'white', margin: '1rem' }}
                      size='small'
                      onClick={handleAllNotifications}
                    >
                      See All Notifications
                    </Button>
                  </div>
                }
                arrow
                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              >
                <Button onClick={handleMessages} style={{ textTransform: 'none' }}>
                  <Typography variant='body1' className='user-info' style={{ color: '#ffff' }}>
                    <Badge badgeContent={1} color='error'>
                      <NotificationsNoneOutlinedIcon style={{ color: '#ffff' }} />
                    </Badge>
                    Messages
                  </Typography>
                </Button>
              </Tooltip>
            </div>
          </ClickAwayListener>
          <Typography variant='body1' className='user-info' style={{ color: '#ffff', display: 'flex' }}>
            <PersonOutlineOutlinedIcon style={{ color: '#ffff' }} />
            {fullName}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
