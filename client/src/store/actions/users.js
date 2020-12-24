import axios from '../axios-server';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";

export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER_SECCESS = 'LOGIN_USER_SECCESS';

export const registerNewUser = (userData) => dispatch => {
  return axios.post(`/users/${userData.email}/new`, userData)
    .then(() =>{
      dispatch({
        type: GET_ERRORS,
        error: 'Registrer Sucssfully! Please Log In again'
      })      
    }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        error: err.response.data.error
      })
    );
};

export const loginUser = userData => dispatch => {
  axios.post(`/users/${userData.email}`, userData).then(res => {
    const { token } = res.data;
    const decoded = jwt_decode(token);

    localStorage.setItem("gitEmailSystemToken", token);
    setAuthToken(token);

    dispatch(setCurrentUser(decoded));
  }).catch(err => {
    dispatch({
      type: GET_ERRORS,
      error: err.response.data.error
    })
  }
  );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    userEmail: decoded.userEmail
  };
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("gitEmailSystemToken");
  setAuthToken(false);

  dispatch(setCurrentUser({}));
};