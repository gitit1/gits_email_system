import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, Input, InputLabel, Popover, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../../components/UI/Button'
import * as actions from '../../store/actions';
import './auth.scss';
import { formValidation, fieldsValidation } from './utils'
const AuthPopup = props => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.users.isAuth);

    const OnLogin = useCallback((user) => dispatch(actions.loginUser(user)), [dispatch]);
    const OnRegistrer = useCallback((email) => dispatch(actions.registerNewUser(email)), [dispatch]);

    const [loginForm, setLoginForm] = useState({
        email: {
            value: '',
            valid: false,
            touched: false
        },
        password: {
            value: '',
            valid: false,
            touched: false,
            minLength: 5,
            maxLength: 8
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    
    let open = Boolean(props.anchor);

    useEffect(() => {
        if (isAuth) {
            setTimeout(() => {
                history.push("/emails/tabs/inbox");
            }, 800);
        }
    },[isAuth, history]);

    const checkFormValidation = useCallback(() => {
        setFormIsValid(formValidation(loginForm));
    }, [loginForm]);

    useEffect(() => {
        checkFormValidation();
    }, [checkFormValidation, formIsValid]);

    const inputHandler = (inputId, e, validationType, validationConditions) => {
        setLoginForm({
            ...loginForm,
            [inputId]: {
                ...loginForm[inputId],
                valid: fieldsValidation(e.target.value, validationType, validationConditions),
                touched: true,
                value: e.target.value
            }
        });
    };

    const onSubmit = (type) => {
        const user = {
            email: loginForm['email'].value,
            password: loginForm['password'].value,
        };
        if (type === 'registrer') {
            OnRegistrer(user)
        } else {
            OnLogin(user);
        }
        props.close();
    };

    return (
        <div>
            <Popover
                open={open}
                anchorEl={props.anchor}
                onClose={props.close}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className='popup-auth'
            >
                <form noValidate autoComplete="off" className="popup-auth__form">
                    <FormControl className='popup-auth__form--form-controller'>
                        <InputLabel htmlFor="to">Email</InputLabel>
                        <Input
                            id="email"
                            type="email"
                            error={loginForm['email'].touched && !loginForm['email'].valid}
                            onChange={(e) => { inputHandler('email', e, 'email') }}
                            value={loginForm['email'].value}
                        />
                    </FormControl>
                    <br /><br />
                    <FormControl className='popup-auth__form--form-controller'>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            type="password"
                            error={loginForm['password'].touched && !loginForm['password'].valid}
                            onChange={(e) => { inputHandler('password', e, 'minLength', { minLength: loginForm['password'].minLength, maxLength: loginForm['password'].maxLength }) }}
                            value={loginForm['password'].value}
                        />
                    </FormControl>
                    <br />
                    <div className='popup-auth__form--btns-div'>
                        <MyButton
                        className="popup-auth__form--btns-div__login"
                            variant="outlined"
                            text="Login"
                            onClick={() => onSubmit('login')}
                            disabled={!formIsValid}
                        />
                        <Button
                            className="popup-auth__form--btns-div__registrer"
                            disabled={!formIsValid}
                            onClick={() => onSubmit('registrer')}>
                            Registrer
                    </Button>

                    </div>
                </form>
            </Popover>
        </div>
    );
}

export default AuthPopup