import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import emailsReducer from './reducers/emails';
import usersReducer from './reducers/users';
import screenReducer from './reducers/screen';


const rootReducer = combineReducers({
    emails: emailsReducer,
    users: usersReducer,
    screen: screenReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

