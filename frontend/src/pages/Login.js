import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

// Notification
import {ToastsContainerPosition, ToastsContainer, ToastsStore} from 'react-toasts';

import * as authActions from '../auth/authActions';
import * as authTypes from '../auth/authTypes';

const useStyles = makeStyles(theme => ({
    paper: {
        paddingTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function Login(props) {
    const classes = useStyles();

    const [username,
        setUsername] = useState('');
    const [password,
        setPassword] = useState('');

    const {dispatch} = props;
    const {statusText, isAuthenticated} = props.auth;

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            username,
            password
        };
        props.dispatch(authActions.loginUser(payload));
    }

    const validateForm = () => {
        return username.length > 0 && password.length > 0;
    }

    useEffect(() => {
        if (statusText && statusText === 'AUTH_WRONG_CREDENTIALS') {
            ToastsStore.warning('Wrong username/password');
            dispatch(authActions.clear_status());
        }

        if (statusText && statusText === 'AUTH_UNKNOWN_USER') {
            ToastsStore.warning('Wrong username/password');
            dispatch(authActions.clear_status());
        }

        if (statusText && statusText === 'AUTH_ERROR') {
            ToastsStore.error('Error!');
            dispatch(authActions.clear_status());
        }
    });

    return ( <> {
        props.auth.isAuthenticated
            ? <Redirect to='/home'/>
            : (
                <Container maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Typography variant="subtitle1">
                            test / test
                        </Typography>
                        <form className={classes.form} align="center" onSubmit={(e) => handleSubmit(e)}>
                            <TextField variant="outlined" margin="normal" required fullWidth value={username} onChange={(e) => setUsername(e.target.value)} id="username" label="Username" name="username" autoComplete="username" autoFocus/>
                            <TextField variant="outlined" margin="normal" required fullWidth value={password} onChange={(e) => setPassword(e.target.value)} name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
                            <Button type="submit" variant="contained" color="primary" disabled={!validateForm()} className={classes.submit}>
                                {props.auth.isLogging
                                    ? "Logging..."
                                    : "Login"}
                            </Button>
                        </form>
                    </div>
                    <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore}/>
                </Container>
            )
    } < />
  );
}

export default connect(state => {
  return {
    auth: state.root.auth
  }
})(Login);
