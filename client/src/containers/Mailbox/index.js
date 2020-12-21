import React, {useEffect,useCallback} from 'react';
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

const MailBox = props => {
    const emailsList = useSelector(state => state.emails.emailsList);

    const dispatch = useDispatch();
    const onInitEmails = useCallback(() => dispatch(actions.getEmails()),[]);

    useEffect(() => {
      onInitEmails();
    },[onInitEmails])

  return (
    <div className='mailbox'>
      <h1>first we test Mailbox</h1>
      <List>
        {emailsList.map ((email) => (
            <ListItem
            key={`${email.reciever}_${email.subject}_${email.creation_date}`}
            role={undefined}
            dense
            button
            onClick={() => {}}
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
      </List>
    </div>
  );
};

export default MailBox;
