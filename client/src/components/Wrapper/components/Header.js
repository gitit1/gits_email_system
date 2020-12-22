import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputAdornment, Grid, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as actions from '../../../store/actions';

const Header = props => {

  const isAuth = useSelector(state => state.users.isAuth);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogin = useCallback(loginValue => dispatch(actions.login(loginValue)), [dispatch]);
  const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);
  const onInitEmailsList = useCallback(() => dispatch(actions.initEmailsList()), [dispatch]);


  const [loginValue, setLoginValue] = useState('');
  const [isLoginFlag, setIsLoginFlag] = useState(false);

  useEffect(
    () => {
      setIsLoginFlag(!!isAuth);
    },
    [isAuth]
  );
  
  const logToSiteHandler = () => {
    if (isLoginFlag) {
      logoutHandler();
    } else {
      loginHandler();
    }
  }

  const loginHandler = () => {
    history.push("/emails/tabs/inbox");
    onLogin(loginValue);
  }
  const logoutHandler = () => {
    setIsLoginFlag(!isLoginFlag);
    setLoginValue('');
    onLogout();
    onInitEmailsList();
    history.push("/");
  }

  return (
    <Grid item xs={12} className="wrapper-grid__header">
      <div className="wrapper-grid__header--logo">
        <Link to="/" className='unstyled-link'>Git's Email</Link>
      </div>
      <div className="wrapper-grid__header--login">
        {!isLoginFlag &&
          <Input
            id="fake-login"
            className="wrapper-grid__header--login__input"
            placeholder="Enter Your Email..."
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />}
        <Button className="wrapper-grid__header--login__button" onClick={() => logToSiteHandler()}>
          {isLoginFlag ? 'Logout' : 'Login'}
        </Button>
      </div>
    </Grid>
  );
};

export default Header;
