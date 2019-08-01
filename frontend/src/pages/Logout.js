import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../auth/authActions';

function Logout(props) {
  useEffect(() => {
    props.dispatch(authActions.logoutRequest());
  })

  return <Redirect to='/home' />;
}

export default connect(state => {
  return {
    auth: state.root.auth
  }
})(Logout);
