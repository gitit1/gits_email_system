import React from 'react';
import {Grid, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const PageSubHeader = props => {
  return (
    <Grid item xs={2} className={props.className}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>
    </Grid>
  );
};

export default PageSubHeader;
