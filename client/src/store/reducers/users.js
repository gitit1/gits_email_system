import updateObject from '../utils/updateObject';
import { GET_ERRORS } from '../actions/users';
import { SET_CURRENT_USER } from '../actions/users';

import { LOGIN_USER_FAIL } from '../actions/users';
import { LOGOUT_USER } from '../actions/users';

const initialState = {
  userEmail: null,
  isAuth: false,
  error: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return updateObject(state, {
        error: action.error
      });
    case SET_CURRENT_USER:
      return updateObject(state, {
        isAuth: !!action.userEmail,
        userEmail: action.userEmail,
        error: null
      });


    case LOGIN_USER_FAIL:
      return updateObject(state, {
        error: action.error
      });
    case LOGOUT_USER:
      return updateObject(state, {
        userEmail: null,
        isAuth: false,
        error: null
      });
    default:
      return state;
  }
};
export default usersReducer;
