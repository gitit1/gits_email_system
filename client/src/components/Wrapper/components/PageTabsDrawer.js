import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';

const EMAILS_MAILBOX_DEFAULT = 'Inbox';

const PageTabsDrawer = props => {
  const userEmail = useSelector(state => state.users.userEmail);
  const smallScreen = useSelector(state => state.screen.smallSize);

  const [currentTab, setCurrentTab] = useState(props.currentDrawerTab);

  const location = useLocation()

  useEffect(() =>{
    if(location.pathname.includes(EMAILS_MAILBOX_DEFAULT.toLowerCase()) && currentTab !== EMAILS_MAILBOX_DEFAULT){
      setCurrentTab(EMAILS_MAILBOX_DEFAULT)
    }
  },[currentTab, location]);
  
  const tabsList = [
    {
      name: EMAILS_MAILBOX_DEFAULT,
      path: EMAILS_MAILBOX_DEFAULT.toLowerCase(),
      icon: <InboxIcon />,
      filterKey: 'reciever',
    },
    {
      name: 'Sent Emails',
      path: 'sent-emails',
      icon: <SendIcon />,
      filterKey: 'sender'
    }
  ]

  return (
    <Grid item xs={props.tabsDrawerGridSize} className="wrapper-grid__main--drawer">
      <h4 className="wrapper-grid__main--drawer__header">{userEmail && userEmail}</h4>
      <List component="nav" >
        {
          tabsList.map((tab) => (
            <Link to={{
              pathname: `/emails/tabs/${tab.path}`,
              params: {
                filterKey: tab.filterKey,
                label: tab.name
              }
            }}
              className='unstyled-link' key={tab.name}>
              <ListItem
                button
                className={currentTab === tab.name ? 'wrapper-grid__main--drawer__tab current-tab' : 'wrapper-grid__main--drawer__tab'}
                onClick={() => {
                  if (smallScreen) {
                    props.toggleTabsDrawer(tab.name)
                  }
                  setCurrentTab(tab.name);
                }}>
                <ListItemIcon>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </Grid >
  );
};

export default PageTabsDrawer;
