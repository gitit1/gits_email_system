import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from '../../store/actions/emails';
import './mailbox.scss';

const EMAILS_LIST_FILTER_KEY_DEFAULT = 'reciever';

const MailBox = props => {
  const [filteredEmailsList, setFilteredEmailsList] = useState([])
  const userEmail = useSelector(state => state.users.userEmail);
  const emailsList = useSelector(state => state.emails.emailsList);
  const history = useHistory();
  const dispatch = useDispatch();
  const onInitEmails = useCallback((userEmail) => dispatch(actions.getEmails(userEmail)), [dispatch]);
  const onDeleteEmail = useCallback((userEmail, emailID) => dispatch(actions.deleteEmail(userEmail, emailID)), [dispatch]);

  useEffect(
    () => {
      userEmail && onInitEmails(userEmail);
    },
    [onInitEmails, userEmail]
  );

  useEffect(() => {
    if (emailsList) {
      const filterKey = props.location.params ? props.location.params.filterKey : EMAILS_LIST_FILTER_KEY_DEFAULT;
      setFilteredEmailsList(emailsList.filter(email => email[filterKey] === userEmail));
    }
  }, [emailsList, userEmail, props.location.params])


  return (
    <div className="mailbox">
      <h1>{props.location.params ? props.location.params.label : 'Inbox'}</h1>
      <List className="mailbox-list">
        <div className="mailbox-list__header">
          <ListItem
            key="list-header"
          >
            <ListItemText primary="From" />
            <ListItemText primary="Subject" />
            <ListItemSecondaryAction>
              Delete Email
              </ListItemSecondaryAction>
          </ListItem>
        </div>
        {filteredEmailsList.map(email => (
          <ListItem
            key={`${email.reciever}_${email.subject}_${email.creation_date}`}
            button
            divider
            onClick={() => { history.push({ pathname: `/emails/show/${email.id}`, state: { emailData: email } }) }}
          >
            <ListItemText primary={email.sender} />
            <ListItemText primary={email.subject} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Delete" onClick={() => { onDeleteEmail(userEmail, email.id) }}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MailBox;
