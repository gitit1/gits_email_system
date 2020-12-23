import axios from 'axios';

export const INIT_EMAILS_LIST = 'INIT_EMAILS_LIST';
export const GET_EMAILS = 'GET_EMAILS';
export const DELETE_EMAIL = 'DELETE_EMAIL';

export const initEmailsList = () => {
  return {
    type: INIT_EMAILS_LIST
  };
}

export const getEmails = (userEmail) => {
  return dispatch => {
    axios.get(`http://localhost:3031/users/${userEmail}/emails`).then(response => {
      console.log(response.data);
      dispatch(getEmailsSuccess(response.data));
    });
  };
};

export const getEmailsSuccess = data => {
  return {
    type: GET_EMAILS,
    emailsList: data
  };
};

export const deleteEmail = (userEmail, emailID) => {
  return dispatch => {
    axios.delete(`http://localhost:3031/users/${userEmail}/emails/${emailID}`).then(response => {
      console.log(response.data);
      dispatch(getEmailsSuccess(response.data));
    });
  };
};