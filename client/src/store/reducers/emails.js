import {GET_EMAILS} from '../actions/emails';

const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

const emailsReducer = (state = {emailsList: []}, action) => {
  switch (action.type) {
    case GET_EMAILS:
      console.log('in reducer')
      return updateObject( state, {
        emailsList: action.emails
    } );
    default:
      return state;
  }
};
export default emailsReducer;
