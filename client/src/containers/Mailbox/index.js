import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as actions from '../../store/actions';
import './mailbox.scss';
import PrompDialog from '../../components/UI/Alert-Dialog/index'
import Avatar from '../../components/UI/Avatar';

const EMAILS_LIST_FILTER_KEY_DEFAULT = 'reciever';

const MailBox = React.memo(props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onInitEmails = useCallback((userEmail) => dispatch(actions.getEmails(userEmail)), [dispatch]);
  const onDeleteEmail = useCallback((userEmail, emailID) => dispatch(actions.deleteEmail(userEmail, emailID)), [dispatch]);

  const [filteredEmailsList, setFilteredEmailsList] = useState([]);
  const [openPromp, setOpenPromp] = useState(false);
  const [deleteEmailId, setDeleteEmailId] = useState(false);
  const [filterKey, setFilterKey] = useState(EMAILS_LIST_FILTER_KEY_DEFAULT);
  const isAuth = useSelector(state => state.users.isAuth);
  const userEmail = useSelector(state => state.users.userEmail);
  const emailsList = useSelector(state => state.emails.emailsList);

  useEffect(
    () => {
      userEmail && isAuth && onInitEmails(userEmail);
    },
    [onInitEmails, userEmail, isAuth]
  );

  useEffect(() => {
    if (emailsList) {
      if (props.location.params && props.location.params.filterKey) {
        setFilterKey(props.location.params.filterKey)
      }
      setFilteredEmailsList(emailsList.filter(email => email[filterKey] === userEmail));
    }
  }, [emailsList, userEmail, props.location.params, filterKey])

  const deleteEmailHandle = (id) => {
    setDeleteEmailId(id)
    setOpenPromp(true);
  }

  const prompDialogHandler = (toDelete) => {
    setOpenPromp(false);
    if (toDelete) {
      onDeleteEmail(userEmail, deleteEmailId);
    }
  }

  return (

    <div className="mailbox">
      <h1>{props.location.params ? props.location.params.label : 'Inbox'}</h1>
      <List className="mailbox-list">
        <div className="mailbox-list__header">
          <ListItem key="list-header">
            <ListItemText inset={true} primary={filterKey === 'reciever' ? 'From' : `To`} />
            <ListItemText inset={true} primary="Subject" />
            <ListItemSecondaryAction>Delete</ListItemSecondaryAction>
          </ListItem>
        </div>
        {filteredEmailsList.map(email => (
          <ListItem
            key={`${email.reciever}_${email.subject}_${email.creation_date}`}
            button
            divider
            onClick={() => { history.push({ pathname: `/emails/show/${email.id}`, state: { emailData: email } }) }}
          >
            <Avatar
              name={email.sender}
              color={email.avatar_color}
            />
            <ListItemText primary={filterKey === 'reciever' ? email.sender : email.reciever} />
            <ListItemText primary={email.subject ? email.subject : '[No Subject]'} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => deleteEmailHandle(email.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <PrompDialog
        open={openPromp}
        close={prompDialogHandler}
        dialogTitle="Delete Email"
        dialogMessage="Are you sure you want to delete the email?"
        dialogAgreeLabel="Delete"
        dialogDisagreeLabel="Cancel"
      />
    </div>
  );
});

export default MailBox;
