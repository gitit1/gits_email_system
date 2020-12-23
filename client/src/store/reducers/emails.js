import { updateObject } from '../utils';
import {INIT_EMAILS_LIST} from '../actions/emails';
import {GET_EMAILS} from '../actions/emails';

const initialState = {
  emailsList: []
}

const emailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_EMAILS_LIST:
      return updateObject( state, {
        emailsList: []
    } );
    case GET_EMAILS:
      return updateObject( state, {
        emailsList: action.emailsList
    } );
    default:
      return state;
  }
};
export default emailsReducer;
