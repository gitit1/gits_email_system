import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Wrapper from './components/Wrapper/Wrapper';
import Mailbox from './containers/Mailbox';
import IndexPage from './containers/IndexPage';
import ComposeEmail from './containers/ComposeEmail';

import './index.scss';

function App() {
  const isAuth = useSelector(state => state.users.isAuth);

  return (
    <Wrapper>
      <Route exact path='/' component={IndexPage} />
      <Route  path='/emails' exact component={Mailbox} />
      <Route  path='/emails/new' exact render={props => isAuth ? <ComposeEmail {...props} /> : <Redirect to="/" />} />
      <Route  path='/emails/tabs/:id' exact component={Mailbox} />
    </Wrapper>
  );
}

export default App;
