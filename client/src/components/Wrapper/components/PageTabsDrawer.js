import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';

const PageTabsDrawer = props => {
  const userEmail = useSelector(state => state.users.userEmail);

  const tabsList = [
    {
      name: 'Inbox',
      path: 'inbox',
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
    <Grid item xs={2} className="wrapper-grid__main--drawer">
      <h4 className="tabs-drawer__header">{userEmail && userEmail}</h4>
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
              <ListItem button>
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
