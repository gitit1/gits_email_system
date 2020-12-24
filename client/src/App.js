import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";

import store from './store/store';
import { setCurrentUser, logoutUser } from "./store/actions";
import setAuthToken from './store/utils/setAuthToken';

import Wrapper from './components/Wrapper';
import Mailbox from './containers/Mailbox';
import IndexPage from './containers/IndexPage';
import ComposeEmail from './containers/ComposeEmail';
import ShowEmail from './containers/ShowEmail';

import './index.scss';

if (localStorage.gitEmailSystemToken) {
  const token = localStorage.gitEmailSystemToken;
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  
  setAuthToken(token);
  store.dispatch(setCurrentUser(decoded));

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  }
}


function App() {
  const isAuth = useSelector(state => state.users.isAuth);

  return (
    <Wrapper>
      <Switch>
        <Route exact path='/' component={IndexPage} />
        <Route path='/emails' exact render={props => isAuth ? <Mailbox {...props} /> : <Redirect to="/" />} />
        <Route path='/emails/new' exact render={props => isAuth ? <ComposeEmail {...props} /> : <Redirect to="/" />} />
        <Route path='/emails/tabs/:id' exact render={props => isAuth ? <Mailbox {...props} /> : <Redirect to="/" />} />
        <Route path='/emails/show/:id' exact render={props => isAuth ? <ShowEmail {...props} /> : <Redirect to="/" />} />
        <Redirect to="/" />
      </Switch>
    </Wrapper>
  );
}

export default App;
