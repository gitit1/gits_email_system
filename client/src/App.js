import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Wrapper from './components/Wrapper';
import Mailbox from './containers/Mailbox';
import IndexPage from './containers/IndexPage';
import ComposeEmail from './containers/ComposeEmail';
import ShowEmail from './containers/ShowEmail';

import './index.scss';

function App() {
  const isAuth = useSelector(state => state.users.isAuth);

  return (
    <Wrapper>
      <Route exact path='/' component={IndexPage} />
      <Route  path='/emails' exact render={props => isAuth ? <Mailbox {...props} /> : <Redirect to="/" />} />
      <Route  path='/emails/new' exact render={props => isAuth ? <ComposeEmail {...props} /> : <Redirect to="/" />} />
      <Route  path='/emails/tabs/:id' exact render={props => isAuth ? <Mailbox {...props} /> : <Redirect to="/" />} />
      <Route  path='/emails/show/:id' exact render={props => isAuth ? <ShowEmail {...props} /> : <Redirect to="/" />} />
    </Wrapper>
  );
}

export default App;
