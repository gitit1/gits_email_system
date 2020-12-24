import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import * as actions from '../../../store/actions';
import AuthPopup from  '../../Auth/auth';

const Header = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.users.isAuth);

  const onLogOut = useCallback(() => dispatch(actions.logoutUser()), [dispatch]);

  const [anchorLoginPopup, setAnchorLoginPopup] = React.useState(null);
  const [isLoginFlag, setIsLoginFlag] = useState(false);

  useEffect(
    () => {
      setIsLoginFlag(!!isAuth);
    },
    [isAuth]
  );
  
  const loginHandler = (event) => {
    if(isLoginFlag){
      onLogOut();
    }else{
      openAuthPopup(event)
    }
  };
  
  const openAuthPopup = (event) =>{
    setAnchorLoginPopup(event.currentTarget);
  }
  const closeAuthPop = () => {
    setAnchorLoginPopup(null);
  };

  return (
    <Grid item xs={12} className="wrapper-grid__header">
      <div className="wrapper-grid__header--logo">
        <Link to="/" className='unstyled-link'>Git's Email</Link>
      </div>
      <div className="wrapper-grid__header--login">
        <Button className="wrapper-grid__header--login__button" onClick={loginHandler}>
          {isLoginFlag ? 'Logout' : 'Login'}
        </Button>
        {!isAuth &&<AuthPopup anchor={anchorLoginPopup} close={closeAuthPop}/>}
        </div>
    </Grid>
  );
};

export default Header;
