import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header.js';
import PageSubHeader from './components/PageSubHeader.js';
import PageTabsDrawer from './components/PageTabsDrawer.js';
import PageContent from './components/PageContent.js';
import * as actions from '../../store/actions';
import './wrapper.scss';

const SMALL_SIZE_WIDTH = 760;

const Wrapper = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSaveScreenSize = useCallback((size) => dispatch(actions.getScreenSize(size)), [dispatch]);

  const isAuth = useSelector(state => state.users.isAuth);
  const smallScreen = useSelector(state => state.screen.smallSize);
  const currentTab = useSelector(state => state.emails.currentTab);
  

  const [isTabsDrawerOpen, setIsTabsDrawerOpen] = useState(true);
  const [currentDrawerTab, setCurrentDrawerTab] = useState(currentTab.name);

  let tabsDrawerGridSize = smallScreen ? 12 : 2;
  const contentGridSize = isAuth && isTabsDrawerOpen ? 10 : 12;

  const getWindowSize = useCallback(() => {
    const isSmallSize = (window.innerWidth <= SMALL_SIZE_WIDTH) ? true : false;
    onSaveScreenSize(isSmallSize);
  }, [onSaveScreenSize]);

  useEffect(() => {
    getWindowSize();
    if (smallScreen) {
      setIsTabsDrawerOpen(false);
    }
  }, [getWindowSize, smallScreen])

  useEffect(() => {
    const resizeListener = () => {
      getWindowSize();
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [onSaveScreenSize, getWindowSize, isAuth, history])


  useEffect(() => {
    if (isAuth) {
        history.push(`/emails/tabs/inbox`);
    }
}, [isAuth, history]);

  const toggleTabsDrawerHandler = (tab) => {
    console.log('toggleTabsDrawerHandler')
    if (tab) {
      setCurrentDrawerTab(tab)
    }
    openDrewer();
  }

  const openDrewer = () =>{
    setIsTabsDrawerOpen(!isTabsDrawerOpen);
  }

  return (
    <div className="wrapper">
      <Grid className="wrapper-grid">
        <Header />
        {isAuth &&
          <PageSubHeader toggleTabsDrawer={openDrewer} />
        }
        <Grid container className="wrapper-grid__main">
          {isAuth && isTabsDrawerOpen &&
            <PageTabsDrawer
              tabsDrawerGridSize={tabsDrawerGridSize}
              toogleOpenDrawer={toggleTabsDrawerHandler}
              currentDrawerTab={currentDrawerTab}
            />
          }
          <PageContent
            contentGridSize={contentGridSize}
            children={props.children}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
