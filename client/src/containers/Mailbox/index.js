import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../store/actions';

import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PrompDialog from '../../components/UI/Alert-Dialog/index'
import Avatar from '../../components/UI/Avatar';

import './mailbox.scss';

const MailBox = React.memo(() => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onInitEmails = useCallback((userEmail) => dispatch(actions.getEmails(userEmail)), [dispatch]);
  const onDeleteEmail = useCallback((userEmail, emailID) => dispatch(actions.deleteEmail(userEmail, emailID)), [dispatch]);
  const onInitTab = useCallback((name, path, filterKey) => dispatch(actions.getCurrentTab(name, path, filterKey)), [dispatch]);

  const isAuth = useSelector(state => state.users.isAuth);
  const userEmail = useSelector(state => state.users.userEmail);
  const emailsList = useSelector(state => state.emails.emailsList);
  const searchList = useSelector(state => state.emails.searchList);
  const currentTab = useSelector(state => state.emails.currentTab);

  const [filteredEmailsList, setFilteredEmailsList] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [openPromp, setOpenPromp] = useState(false);
  const [deleteEmailId, setDeleteEmailId] = useState(false);

  useEffect(
    () => {
      userEmail && isAuth && onInitEmails(userEmail);
    },
    [onInitEmails, userEmail, isAuth]
  );

  useEffect(() => {
    if(searchList.length !== 0){
      setFilteredEmailsList(searchList.reverse());
      setSearchMode(true)
    }
    if (emailsList && searchList.length === 0) {
      setFilteredEmailsList(emailsList.filter(email => email[currentTab.filterKey] === userEmail).reverse());
      setSearchMode(false);

    }
  }, [emailsList, userEmail, currentTab.filterKey, searchList, onInitTab])

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
      {filteredEmailsList.length === 0 ?
        <h2>You Don't Have Any Emails!</h2>
        :
        <div>
          <h1>{searchMode ? 'Search' : currentTab.name}</h1>
          
          <List className="mailbox-list">
          {!searchMode &&
            <div className="mailbox-list__header">
              <ListItem key="list-header" >
                <ListItemText inset={true} primary={currentTab.name === 'Inbox' ? 'From' : `To`} />
                <ListItemText primary="Subject" />
              </ListItem>
            </div>}
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
                <ListItemText primary={currentTab.filterKey === 'reciever' ? email.sender : email.reciever} secondary={new Date(email.creation_date).toLocaleDateString()} />
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
        </div>}
    </div>
  );
});

export default MailBox;
