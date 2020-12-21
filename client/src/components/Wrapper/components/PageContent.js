import React from 'react';
import {Grid, Button} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const PageContent = props => {
  return (
    <Grid item xs={10}>
      <section className="wrapper-right-window">
        {props.children}
      </section>
    </Grid>
  );
};

export default PageContent;
