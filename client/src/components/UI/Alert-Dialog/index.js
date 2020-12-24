import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './alert-dialog.scss'

const PrompDialog = props => {
  return (
    <div className="promp-dialog">
      <Dialog
        open={props.open}
        onClose={props.close}
        className="promp-dialog__dialog"
      >
        <DialogTitle className="promp-dialog__dialog--title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.close(true)} className="promp-dialog__dialog--agree-btn">
            {props.dialogAgreeLabel}
          </Button>
          <Button onClick={() => props.close(false)} autoFocus className="promp-dialog__dialog--disagree-btn">
            {props.dialogDisagreeLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PrompDialog