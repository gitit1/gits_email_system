import updateObject from '../utils/updateObject';
import {INIT_EMAILS_LIST} from '../actions/emails';
import {GET_EMAILS} from '../actions/emails';
import {GET_CURRENT_TAB} from '../actions/emails';

const initialState = {
  emailsList: [],
  currentTab: {
    name: '',
    path: '',
    filterKey: ''
  }
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
    case GET_CURRENT_TAB:
      return updateObject( state, {
        currentTab: {
          name: action.name,
          path: action.path,
          filterKey: action.filterKey
        }
    } );
    default:
      return state;
  }
};
export default emailsReducer;
