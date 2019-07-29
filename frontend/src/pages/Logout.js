import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import * as authActions from '../auth/authActions';
import * as authProvider from '../auth/authProvider';

function Logout(props) {
  useEffect(() => {
    props.dispatch()
  })

  return (
    {(props.auth.logged && props.auth.token) ? ('a') : <Redirect to='/' />}
  );
}

export default connect(state => {
  return {
    auth: state.root.auth
  }
})(Login);
