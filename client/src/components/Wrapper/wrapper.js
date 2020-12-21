import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header.js';
import PageSubHeader from './components/PageSubHeader.js';
import PageEmailsTree from './components/PageEmailsTree.js';
import PageContent from './components/PageContent.js';

import './Wrapper.scss';

const Wrapper = props => {
  return (
    <div className="wrapper">
      <Grid className="site-body">
        <Header className="site-header" />
        <PageSubHeader className="wrapper-sub-menu" />
        <Grid container>
            <PageEmailsTree item className="wrapper-left-drawer" />
            <PageContent children={props.children}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
