import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {InputBase} from '@material-ui/core';

const useStyles = makeStyles (theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing (2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up ('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    backgroundColor: fade (theme.palette.common.white, 0.95),
    '&:hover': {
      backgroundColor: fade (theme.palette.common.white, 0.85),
    },
    marginRight: theme.spacing (6),
    width: '100%',
    [theme.breakpoints.up ('sm')]: {
      marginLeft: theme.spacing (12),
      width: 'auto',
    },
    textAlign: 'right',
  },
  searchIcon: {
    padding: theme.spacing (0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#9a58b2',
  },
  inputInput: {
    padding: theme.spacing (1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing (4)}px)`,
    transition: theme.transitions.create ('width'),
    width: '100%',
    [theme.breakpoints.up ('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up ('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up ('md')]: {
      display: 'none',
    },
  },
}));

const Search = props => {
  const classes = useStyles ();
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={props.placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  );
};

export default Search;