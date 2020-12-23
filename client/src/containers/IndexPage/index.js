import React from 'react';
import './indexPage.scss';
import DraftsIcon from '@material-ui/icons/Drafts';

const IndexPage = props => {

  return (
    <div className="index-page">
      <DraftsIcon className="index-page__icon" />
      <div className="index-page__text">
        <h1>Hello and Welcome to Git's Email System!</h1>
        <h3>Please Registrer/Login!</h3>
      </div>
    </div>
  );
};

export default IndexPage;
