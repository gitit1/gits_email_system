import React from 'react';
import { useSelector } from 'react-redux';
import {Grid, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';


const PageSubHeader = props => {
  const userEmail = useSelector(state => state.users.userEmail);

  const tabsList = [
    {
      name: 'Inbox',
      icon: <InboxIcon />,
      filterKey: 'reciever'
    },
    {
      name: 'Sent Emails',
      icon: <SendIcon />,
      filterKey: 'sender'
    }
  ]

  return (
    <Grid item xs={2} className={props.className}>
      <h4>{userEmail && userEmail}</h4>
      <List component="nav" aria-label="main mailbox folders">
        {
          tabsList.map(tab => (
            <ListItem button>
              <ListItemIcon>
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.name} />
            </ListItem>
          ))
        }
      </List>
    </Grid>
  );
};

export default PageSubHeader;
