import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../../store/actions';

import { fade, makeStyles, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.95),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.85),
        },
        marginRight: theme.spacing(6),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(12),
            width: 'auto',
        },
        textAlign: 'right',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
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
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const Search = props => {
    const dispatch = useDispatch();
    const onUpdateSearchResultsList = useCallback((results) => dispatch(actions.getResultsList(results)), [dispatch]);
 
    const classes = useStyles();
    const emailsList = useSelector(state => state.emails.emailsList);

    const searchHandler = (e) => {
        const searchTerm = e.target.value;

        if(searchTerm.length === 0){
            onUpdateSearchResultsList([]);
            return;
        }

        const filteredList = emailsList.filter(email =>
                email.reciever.includes(searchTerm) ||
                email.sender.includes(e.target.value) ||
                email.message.includes(searchTerm) ||
                email.subject.includes(searchTerm)
        );

        onUpdateSearchResultsList(filteredList)
    }
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
                onChange={(e) => searchHandler(e)}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    );
};

export default Search;