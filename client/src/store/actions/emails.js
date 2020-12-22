import axios from 'axios';

export const GET_EMAILS = 'GET_EMAILS';
export const INIT_EMAILS_LIST = 'INIT_EMAILS_LIST';

export const initEmailsList = () => {
  return {
    type: INIT_EMAILS_LIST
  }; 
}

export const getEmails = (userEmail) => {
  return dispatch => {
    axios.get (`http://localhost:3031/emails/${userEmail}`).then (response => {
      console.log (response.data);
      dispatch (getEmailsSuccess(response.data));
    });
  };
};

export const getEmailsSuccess = data => {
  return {
    type: GET_EMAILS,
    emailsList: data
  };
};