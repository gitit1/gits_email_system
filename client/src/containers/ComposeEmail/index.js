import React from 'react';
import { Box, FormControl, Input, InputLabel, TextField, TextareaAutosize } from '@material-ui/core';
import Button from '../../components/Material-UI/Button'
import './composeEmail.scss';

const ComposeEmail = () => {
  return (
    <div className="compose-email-page">
      <Box component="div" m={12} className="compose-email-page__box">
        <form noValidate autoComplete="off" className="compose-email-page__box--form">
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">From</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" disabled />
          </FormControl>
          <br /><br />
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">To</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" required />
          </FormControl>
          <br /><br />
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">Subject</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
          </FormControl>
          <br /><br /><br />
          <FormControl fullWidth>
            <TextareaAutosize
              rowsMax={4}
              variant="outlined"
              required
              className="compose-email-page__box--form__msgBox"
            />
          </FormControl>
          <Button variant="outlined" text="New Email" className="compose-email-page__box--form__send-btn" />
        </form>
      </Box>
    </div>
  )
}

export default ComposeEmail