import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from '../../store/actions/emails';

import './mailbox.scss';

const MailBox = () => {
  const userEmail = useSelector(state => state.users.userEmail);
  const emailsList = useSelector(state => state.emails.emailsList);

  const dispatch = useDispatch();
  const onInitEmails = useCallback((userEmail) => dispatch(actions.getEmails(userEmail)), []);

  useEffect(
    () => {
      console.log('userName:',userEmail)
      userEmail && onInitEmails(userEmail);
    },
    [onInitEmails, userEmail]
  );

  return (
    <div className="mailbox">
      <h1>Inbox</h1> {/* TODO: FIX WITH ROUTING TO BE DYNAMIC */}
      {!userEmail
        ? <p>Please Enter Your Email</p>
        : <List> {/* TODO: ACCORDING TO ROUTING - NEEDS TO FILTER THE CURRECT LIST */}
          {emailsList.map(email => (
            <ListItem
              key={`${email.reciever}_${email.subject}_${email.creation_date}`}
              role={undefined}
              dense
              button
              onClick={() => { }}
            >
              <ListItemText primary={email.sender} />
              <ListItemText primary={email.subject} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>}
    </div>
  );
};

export default MailBox;
