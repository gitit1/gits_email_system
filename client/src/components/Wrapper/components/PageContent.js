import React from 'react';
import { useSelector } from 'react-redux';
import {Grid} from '@material-ui/core';

const PageContent = props => {
  const error = useSelector(state => state.users.error);
  return (
    <Grid item xs={props.contentGridSize} className="wrapper-grid__main--content" >
      <section>
        {!error ? props.children : <p>{error}</p>}
      </section>
    </Grid>
  );
};

export default PageContent;
