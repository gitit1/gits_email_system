import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header.js';
import PageSubHeader from './components/PageSubHeader.js';
import PageEmailsTree from './components/PageEmailsTree.js';
import PageContent from './components/PageContent.js';

import './Wrapper.scss';


const Wrapper = props => {
  const isAuth = useSelector(state => state.users.isAuth);
  const contentGridSize = isAuth ? 10 : 12
  return (
    <div className="wrapper">
      <Grid className="site-body">
        <Header className="site-header" />
        {isAuth && <PageSubHeader className="wrapper-sub-menu" />}
        <Grid container>
            {isAuth && <PageEmailsTree item className="wrapper-left-drawer" />}
            <PageContent contentGridSize={contentGridSize} children={props.children}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
