import React from 'react';
import Grid from '@material-ui/core/Grid';

const Header = props => {
  return (
    <Grid item xs={12} className={props.className}>
        <div className="logo">Git's Email</div>
    </Grid>
  );
};

export default Header;
