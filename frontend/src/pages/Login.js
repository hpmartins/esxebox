import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';

import * as authActions from '../auth/authActions';
import * as authTypes from '../auth/authTypes';

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openNotf, setOpenNotf] = useState(false);

  const { dispatch, statusText } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {username, password};
    props.dispatch(authActions.loginUser(payload));
  }

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  // useEffect((dispatch) => {
  //   if (statusText) {
  //     setOpenNotf(true);
  //     dispatch({type: authTypes.AUTH_CLEAR_STATUS});
  //   }
  // }, [statusText])

  return (
    <>
    {props.auth.isAuthenticated
     ? <Redirect to='/home' />
     :
     (
          <Container maxWidth="xs">
            <div className={classes.paper}>

            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Typography variant="subtitle1">
              test / test
            </Typography>
              <form className={classes.form} align="center" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              { props.auth.statusText
                ? <Snackbar
                  open={openNotf}
                  onClose={() => setOpenNotf(false)}
                  message={props.auth.statusText}
                />
              : ''
            }
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!validateForm()}
                  className={classes.submit}
                >
                  {props.auth.isLogging ? "Logging..." : "Login"}
                </Button>
              </form>
            </div>
          </Container>
      )}
      </>
  );
}

export default connect(state => {
  return {
    auth: state.root.auth
  }
})(Login);
