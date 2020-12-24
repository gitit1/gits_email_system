import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, FormControl, Input, InputLabel, TextareaAutosize } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button'
import './composeEmail.scss';
import * as actions from '../../store/actions';
import {formValidation, fieldsValidation} from '../../components/Auth/utils';

const ComposeEmail = () => {
  const userEmail = useSelector(state => state.users.userEmail);
  const [composeEmailForm, setComposeEmailForm] = useState({
    from: {
      value: userEmail,
      valid: true
    },
    to: {
      value: '',
      valid: false,
      touched: false
    },
    subject: {
      value: '',
      valid: true
    },
    message: {
      value: '',
      valid: false,
      minLength: 5
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isEmailSentSuccess, setIsEmailSentSuccess] = useState(false);
  const smallScreen = useSelector(state => state.screen.smallSize);
  const history = useHistory();
  const dispatch = useDispatch();
  const onSendEmail = useCallback((email) => dispatch(actions.sendEmail(email)), [dispatch]);

  const sendEmailHandler = () => {
    const email = {
      sender: composeEmailForm['from'].value,
      reciever: composeEmailForm['to'].value,
      subject: composeEmailForm['subject'].value,
      message: composeEmailForm['message'].value,
      creation_date: new Date().getTime()
    }
    onSendEmail(email).then(() => {
      setIsEmailSentSuccess(true);
      setTimeout(() => {
        history.push("/emails/tabs/inbox");
      }, 1000);
    });
  }

  const checkFormValidation = useCallback(() => {
    setFormIsValid(formValidation(composeEmailForm));
  }, [composeEmailForm]);

  const inputHandler = (inputId, e, validationType, validationConditions) => {
    setComposeEmailForm({
      ...composeEmailForm,
      [inputId]: {
        ...composeEmailForm[inputId],
        valid: fieldsValidation(e.target.value, validationType, validationConditions),
        touched: true,
        value: e.target.value
      }
    });
  };

  useEffect(() => {
    checkFormValidation();
  }, [checkFormValidation, formIsValid]);

  return (
    <div className="compose-email-page">
      <Box component="div" m={smallScreen ? 2 : 12} className="compose-email-page__box">
        {
          isEmailSentSuccess ? <h1>Sent Email Successfully!</h1> :

            <form noValidate autoComplete="off" className="compose-email-page__box--form">
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="from"
                >{userEmail}
                </InputLabel>
                <Input id="from" disabled />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <InputLabel htmlFor="to">To</InputLabel>
                <Input
                  id="to"
                  error={composeEmailForm['to'].touched && !composeEmailForm['to'].valid}
                  onChange={(e) => inputHandler('to', e, 'email')}
                  value={composeEmailForm['to'].value}
                />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <Input
                  id="subject"
                  onChange={(e) => inputHandler('subject', e)}
                  value={composeEmailForm['subject'].value}
                />
              </FormControl>
              <br /><br /><br />
              <FormControl fullWidth>
                <TextareaAutosize
                  rowsMax={smallScreen ? 3 : 4}
                  variant="outlined"
                  className="compose-email-page__box--form__message"
                  onChange={(e) => { inputHandler('message', e, 'minLength', { minLength: composeEmailForm['message'].minLength }) }}
                  value={composeEmailForm['message'].value}
                />
              </FormControl>
              <Button
                variant="outlined"
                text="New Email"
                className="compose-email-page__box--form__send-btn"
                disabled={!formIsValid}
                onClick={() => sendEmailHandler()}
              />
            </form>
        }
      </Box>
    </div>
  )
}

export default ComposeEmail