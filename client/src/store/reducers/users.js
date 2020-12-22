import { updateObject } from '../utils';
import { LOGIN_USER_SECCESS } from '../actions/users';
import { LOGIN_USER_FAIL } from '../actions/users';
import { LOGOUT_USER } from '../actions/users';

const initialState = {
  userEmail: null,
  isAuth: false,
  error: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SECCESS:
      return updateObject(state, {
        userEmail: action.userEmail,
        isAuth: true,
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
