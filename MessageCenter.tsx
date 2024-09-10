/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, makeStyles, Tab, Typography } from '@material-ui/core';
import { TabContext, TabList } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';

const useStyles = makeStyles(theme => ({
  cardHeader: {
    color: '#035C67'
  },
  title: {
    fontWeight: 'bold',
    margin: 0
  }
}));

// Define types for messages
interface Message {
  id: string;
  from: string;
  subject: string;
  description?: string;
  read: boolean;
  pinned: boolean;
}

interface LocationState {
  state?: {
    messages: Message[];
  };
}

const MessageCenter: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<string>('All');
  const location = useLocation<LocationState>();
  const messages = location.state?.state?.messages || [];
  const handleChange = (e: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  console.log(location);
  const unreadMessages = messages.filter(item => !item.read);

  return (
    <div>
      <Card style={{ margin: '2rem' }}>
        <CardHeader title={<p className={classes.title}>Message Center</p>} className={classes.cardHeader} />
        <Divider />
        <CardContent>
          <TabContext value={value}>
            <Box
              className='Tabs'
              style={{
                borderBottom: 1,
                borderColor: 'divider',
                position: 'sticky',
                top: 0,
                width: '100%',
                paddingTop: '15px',
                zIndex: 1,
                backgroundColor: 'white'
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label='lab API tabs example'
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#035C67',
                    height: '2.5px'
                  }
                }}
              >
                <Tab value='Unread' label={`Unread(${unreadMessages.length})`} />
                <Tab value='All' label={`All(${messages.length})`} />
                <Tab value='Archive' label='Archive' />
              </TabList>
            </Box>
          </TabContext>
          {value === 'All' && (
            <Grid container spacing={3} style={{ marginTop: '1rem' }}>
              <Grid item xs={3}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '1rem' }}>
                  <p>Sort By :</p>
                  <p>Showing {messages.length} Results</p>
                </div>
                <Divider />
                {messages.map(item => (
                  <div key={item.id} className={item.read ? 'read' : 'unread'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {item.read ? <DraftsOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                        <div>
                          <p style={{ margin: 0 }}>From {item.from}</p>
                          <p style={{ margin: 0 }}>{item.subject}</p>
                        </div>
                      </div>
                      {item.pinned && <img src='assets\img\iconoir--pin.svg' alt='pinIcon' width='auto' height='auto' />}
                      <img src='assets\img\mi--delete.svg' alt='deleteIcon' width='auto' height='auto' />
                    </div>
                    <Divider />
                  </div>
                ))}
              </Grid>
              <Grid item xs={9}>
                {messages.map(item => (
                  <Card
                    key={item.id}
                    style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', margin: '1rem', padding: '1rem' }}
                    className={item.read ? 'read' : 'unread'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {item.read ? <DraftsOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                      <div>
                        <h5 style={{ margin: 0 }}>{item.subject}</h5>
                        <br />
                        <p style={{ margin: 0 }}>{item.description}</p>
                      </div>
                    </div>
                    {item.pinned && <img src='assets\img\iconoir--pin.svg' alt='pinIcon' width='auto' height='auto' />}
                  </Card>
                ))}
              </Grid>
            </Grid>
          )}
          {value === 'Unread' &&
            unreadMessages.map(item => (
              <Card
                key={item.id}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', margin: '1rem', padding: '1rem' }}
                className={item.read ? 'read' : 'unread'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.read ? <DraftsOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                  <div>
                    <h5 style={{ margin: 0 }}>{item.subject}</h5>
                    <br />
                    <p style={{ margin: 0 }}>{item.description}</p>
                  </div>
                </div>
                {item.pinned && <img src='assets\img\iconoir--pin.svg' alt='pinIcon' width='auto' height='auto' />}
              </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageCenter;
