import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header.js';
import PageSubHeader from './components/PageSubHeader.js';
import PageTabsDrawer from './components/PageTabsDrawer.js';
import PageContent from './components/PageContent.js';

import './wrapper.scss';

const Wrapper = props => {
  const [isTabsDrawerOpen, setIsTabsDrawerOpen] = useState(true)
  const isAuth = useSelector(state => state.users.isAuth);
  const contentGridSize = isAuth && isTabsDrawerOpen ? 10 : 12;

  const toggleTabsDrawerHandler = () => {
    console.log('in toggleTabsDrawerHandler');
    setIsTabsDrawerOpen(!isTabsDrawerOpen);
  }

  return (
    <div className="wrapper">
      <Grid className="wrapper-grid">
        <Header/>
        {isAuth && <PageSubHeader toggleTabsDrawer={toggleTabsDrawerHandler} />}
        <Grid container className="wrapper-grid__main">
          {isAuth && isTabsDrawerOpen && <PageTabsDrawer />}
          <PageContent contentGridSize={contentGridSize} children={props.children}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
