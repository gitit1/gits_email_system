import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {Button, IconButton, Grid} from '@material-ui/core';

const pageSubHeader = props => {
  return (
    <Grid item xs={12} className={props.className}>
        <div className="sub-menu-icon__div">
          <IconButton>
            <MenuIcon className="sub-menu-icon" />
          </IconButton>
        </div>
        <div className="sub-menu-create-email-button__div">
          <Button variant="outlined" className="sub-menu-create-email-button">
            New Email
          </Button>
        </div>
    </Grid>
  );
};

export default pageSubHeader;
