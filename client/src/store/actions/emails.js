import axios from '../axios-server';

export const INIT_EMAILS_LIST = 'INIT_EMAILS_LIST';
export const GET_EMAILS = 'GET_EMAILS';
export const DELETE_EMAIL = 'DELETE_EMAIL';
export const GET_CURRENT_TAB = 'GET_CURRENT_TAB';
export const GET_RESULTS_LIST = 'GET_RESULTS_LIST';

export const initEmailsList = () => {
  return {
    type: INIT_EMAILS_LIST
  };
}

export const getCurrentTab = (name, path, filterKey) => {
  return {
    type: GET_CURRENT_TAB,
    name: name,
    path: path,
    filterKey: filterKey
  };
};


export const getResultsList = results => {
  return {
    type: GET_RESULTS_LIST,
    searchList: results
  };
};

export const getEmails = (userEmail) => {
  return dispatch => {
    axios.get(`/users/${userEmail}/emails`).then(response => {
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
    axios.delete(`/users/${userEmail}/emails/${emailID}`).then(response => {
      dispatch(getEmailsSuccess(response.data));
    });
  };
};

export const sendEmail = (email) => {
  return dispatch => {
    return axios.post(`/users/${email.sender}/emails/`, email)
      .then(response => {
        dispatch(getEmailsSuccess(response.data));
      })
  };
};