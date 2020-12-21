import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/header';

import './wrapper.scss';

const wrapper = props => {
  return (
    <div className="wrapper">
      <Grid item xs={12}>
        <Header className="site-header" />
      </Grid>
      <Grid className="site-body">
        <Grid item xs={12}>
            <section className="wrapper_sub_menu">wrapper_sub_menu</section>
        </Grid>
        <Grid container>
            <Grid item xs={3}>
                <section className="wrapper_left_drawer" >wrapper_left_drawer</section>
            </Grid>
            <Grid item xs={9}>
                <section className="wrapper_right_window">
                    {props.children}
                </section>
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default wrapper;
