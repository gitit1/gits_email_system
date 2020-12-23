import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header.js';
import PageSubHeader from './components/PageSubHeader.js';
import PageTabsDrawer from './components/PageTabsDrawer.js';
import PageContent from './components/PageContent.js';
import * as actions from '../../store/actions';
import './wrapper.scss';

const SMALL_SIZE_WIDTH = 760;

const Wrapper = props => {
  const isAuth = useSelector(state => state.users.isAuth);
  const smallScreen = useSelector(state => state.screen.smallSize);
  const dispatch = useDispatch();
  const onSaveScreenSize = useCallback((size) => dispatch(actions.getScreenSize(size)), [dispatch]);

  const [isTabsDrawerOpen, setIsTabsDrawerOpen] = useState(true)
  const [currentDrawerTab, setCurrentDrawerTab] = useState('Inbox')
  let tabsDrawerGridSize = smallScreen ? 12 : 2;
  const contentGridSize = isAuth && isTabsDrawerOpen ? 10 : 12;

  const getWindowSize = useCallback(() =>{
    const isSmallSize = (window.innerWidth <= SMALL_SIZE_WIDTH) ? true : false;
    onSaveScreenSize(isSmallSize);
    console.log('resize 1: ',isSmallSize)
    console.log('window.innerWidth 1: ',window.innerWidth)
  },[onSaveScreenSize]);

  useEffect(() => {//componentDidMount size check
    getWindowSize();
    if(smallScreen){
      setIsTabsDrawerOpen(false);
    }
  },[getWindowSize,smallScreen])

  useEffect(() => {
    const resizeListener = () => {
      getWindowSize();
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [onSaveScreenSize, getWindowSize])



  const toggleTabsDrawerHandler = (currentTab) => {
    if(currentTab){
      setCurrentDrawerTab(currentTab)
    }
    setIsTabsDrawerOpen(!isTabsDrawerOpen);
  }

  return (
    <div className="wrapper">
      <Grid className="wrapper-grid">
        <Header />
        {isAuth &&
          <PageSubHeader toggleTabsDrawer={toggleTabsDrawerHandler} />
        }
        <Grid container className="wrapper-grid__main">
          {isAuth && isTabsDrawerOpen &&
            <PageTabsDrawer
              tabsDrawerGridSize={tabsDrawerGridSize}
              toggleTabsDrawer={toggleTabsDrawerHandler}
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
