import React, {useState} from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import './mailbox.scss';

const MailBox = props => {
  const [emailsList, setEmailsList] = useState ([
    {
      sender: 'git@test.com',
      reciever: 'dan@test.com',
      message: 'hello!!!!',
      subject: 'this is test number 1',
      creation_date: 1603464807000,
    },
    {
      sender: 'lola@test.com',
      reciever: 'dan@test.com',
      message: 'hello 222!!!!',
      subject: 'this is test number 2',
      creation_date: 1603464807000,
    },
    {
      sender: 'luka@test.com',
      reciever: 'lexie@test.com',
      message: 'test!!!!!!!!!!',
      subject: 'this is test number 3',
      creation_date: 1603464807000,
    },
  ]);

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
