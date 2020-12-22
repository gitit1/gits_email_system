import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, InputAdornment, Grid, Button } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as actions from '../../../store/actions';

const Header = props => {

  const isAuth = useSelector(state => state.users.isAuth);
  const dispatch = useDispatch();

  const onLogin = useCallback(loginValue => dispatch(actions.login(loginValue)), []);
  const onLogout = useCallback(() => dispatch(actions.logout(), actions.initEmails()), []);
  const onInitEmails = useCallback(() => dispatch(actions.initEmails()), []);

  const [loginValue, setLoginValue] = useState('');
  const [isLoginFlag, setIsLoginFlag] = useState(false);

  useEffect(
    () => {
      setIsLoginFlag(!!isAuth);
    },
    [isAuth]
  );

  const loginHandler = () => {
    if (isLoginFlag) {
      onLogout();
      setIsLoginFlag(!isLoginFlag);
      setLoginValue('');
      onInitEmails();
    } else {
      onLogin(loginValue);
    }
  }

  return (
    <Grid item xs={12} className={props.className}>
      <div className="logo">Git's Email</div>
      <div className="login">
        {!isLoginFlag &&
          <Input
            id="fake-login"
            className="fake-login"
            placeholder="Enter Your Email..."
            value={loginValue}
            onChange={e => setLoginValue(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />}
        <Button className="login__button" onClick={() => loginHandler()}>
          {isLoginFlag ? 'Logout' : 'Login'}
        </Button>
      </div>
    </Grid>
  );
};

export default Header;
