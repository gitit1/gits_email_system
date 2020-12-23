import axios from 'axios';

export const LOGIN_USER_SECCESS = 'LOGIN_USER_SECCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = (userEmail) => {
  return dispatch => {
    return axios.get(`http://localhost:3031/users/${userEmail}`).then (response => {
      dispatch (!response.data ? loginFail('User Not Found') : loginSuccess(userEmail));
    });
  };
};

export const logout = () => {
  return {
    type: LOGOUT_USER
  }; 
}

export const loginSuccess = userEmail => {
  return {
    type: LOGIN_USER_SECCESS,
    userEmail: userEmail,
    isAuth: true
  };
};

export const loginFail = (error) => {
  return {
      type: LOGIN_USER_FAIL,
      error: error
  };
};