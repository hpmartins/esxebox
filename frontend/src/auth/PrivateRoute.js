import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => {
        if (!auth.isAuthenticated) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
)

export default connect(state => {
  return {
    auth: state.root.auth
  }
})(PrivateRoute);
