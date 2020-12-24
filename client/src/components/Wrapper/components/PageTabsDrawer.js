import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import * as actions from '../../../store/actions';

import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import { Grid, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const PageTabsDrawer = props => {
  const location = useLocation();
  const dispatch = useDispatch();

  const onInitTab = useCallback((name, path, filterKey) => dispatch(actions.getCurrentTab(name, path, filterKey)), [dispatch]);

  const userEmail = useSelector(state => state.users.userEmail);
  const smallScreen = useSelector(state => state.screen.smallSize);

  const [currentTab, setCurrentTab] = useState(props.currentDrawerTab);
  const [tabsList] = useState([
    {
      name: 'Inbox',
      path: 'inbox',
      icon: <InboxIcon />,
      filterKey: 'reciever',
    },
    {
      name: 'Sent Emails',
      path: 'sent-emails',
      icon: <SendIcon />,
      filterKey: 'sender'
    }
  ])

  useEffect(() => {
    const tabExist = tabsList.filter(tab => { return location.pathname.includes(tab.path) })[0];
    if (tabExist) {
      onInitTab(tabExist.name, tabExist.path, tabExist.filterKey);
      setCurrentTab(tabExist.name);
    }else{
      setCurrentTab(null)
    }
  }, [location, onInitTab, tabsList]);

  return (
    <Grid item xs={props.tabsDrawerGridSize} className="wrapper-grid__main--drawer">
      <h4 className="wrapper-grid__main--drawer__header">{userEmail && userEmail}</h4>
      <List component="nav" >
        {
          tabsList.map((tab) => (
            <Link to={{
              pathname: `/emails/tabs/${tab.path}`,
              params: {
                filterKey: tab.filterKey,
                label: tab.name
              }
            }}
              className='unstyled-link' key={tab.name}>
              <ListItem
                button
                className={currentTab === tab.name ? 'wrapper-grid__main--drawer__tab current-tab' : 'wrapper-grid__main--drawer__tab'}
                onClick={() => {
                  if (smallScreen) {
                    props.toggleTabsDrawer(tab.name)
                  }
                  setCurrentTab(tab.name);
                }}>
                <ListItemIcon>
                  {tab.icon}
                </ListItemIcon>
                <ListItemText primary={tab.name} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </Grid >
  );
};

export default PageTabsDrawer;
