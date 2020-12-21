import axios from 'axios';

export const GET_EMAILS = 'GET_EMAILS';

export const getEmails = () => {
  return dispatch => {
    axios.get ('http://localhost:3031/emails').then (response => {
      console.log (response.data);
      // dispatch(() =>{
      //   console.log('in dispatch')
      //   return {
      //     type: 'GET_EMAILS',
      //     emails: response.data
      //   };
      // })
      dispatch (getEmailsSuccess(response.data));
    });
  };
};

export const getEmailsSuccess = emails => {
  return {
    type: GET_EMAILS,
    emails: emails,
  };
};
