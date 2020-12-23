import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, FormControl, Input, InputLabel, TextareaAutosize } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Material-UI/Button'
import './composeEmail.scss';
import * as actions from '../../store/actions';

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

  const checkFormValidation = () => {
    console.log('in check validation', composeEmailForm)
    let isValid = true;
    for (var key in composeEmailForm) {
      if (!composeEmailForm[key].valid) {
        console.log('key is:', composeEmailForm[key], ' and he is: ', composeEmailForm[key].valid)
        isValid = false;
        break;
      }
    }
    console.log('isValid: ', isValid)
    setFormIsValid(isValid);
  }
  const inputHandler = (inputId, e, validationType, t) => {
    let value = e.target.value;
    console.log('in input handler:', inputId, e.target.value, validationType,)
    console.log('e.key', e.key)
    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    switch (validationType) {
      case 'email':
        setComposeEmailForm({
          ...composeEmailForm,
          [inputId]: {
            ...composeEmailForm[inputId],
            valid: emailPattern.test(value),
            touched: true,
            value: value
          }
        })
        break;
      case 'msgLength':
        console.log('in msgLength', value.length >= composeEmailForm[inputId].minLength)
        console.log('e.target.value', e.target.value)
        setComposeEmailForm({
          ...composeEmailForm,
          [inputId]: {
            ...composeEmailForm[inputId],
            valid: value.length >= composeEmailForm[inputId].minLength,
            touched: true,
            value: value
          }
        });
        console.log('composeEmailForm:', composeEmailForm)
        break;
      default:
        setComposeEmailForm({
          ...composeEmailForm,
          [inputId]: {
            ...composeEmailForm[inputId],
            touched: true,
            value: value
          }
        })
        break;
    }
    checkFormValidation();
  }

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
                  required
                  error={composeEmailForm['to'].touched && !composeEmailForm['to'].valid}
                  onKeyDown={(e) => inputHandler('to', e, 'email')}
                />
              </FormControl>
              <br /><br />
              <FormControl fullWidth>
                <InputLabel htmlFor="subject">Subject</InputLabel>
                <Input
                  id="subject"
                  onKeyDown={(e) => inputHandler('subject', e)}
                />
              </FormControl>
              <br /><br /><br />
              <FormControl fullWidth>
                <TextareaAutosize
                  rowsMax={smallScreen ? 3 : 4}
                  variant="outlined"
                  className="compose-email-page__box--form__message"
                  onChange={(e) => { inputHandler('message', e, 'msgLength', 'onChange') }}
                  // onKeyDown={(e) => { (e.key === 'Backspace') && inputHandler('message', e, 'msgLength', 'onKeyDown') }}
                  onKeyDown={(e) => { console.log('keydown') }}
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