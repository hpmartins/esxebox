import { push } from 'connected-react-router'

import * as authTypes from './authTypes';
import dataProvider from '../internal/dataProvider';

export function loginRequest(payload) {
  return dataProvider('login', payload)
    .then(response => response).catch(error => error);
}

export function loginUser(payload) {
  return {
    type: authTypes.AUTH_LOGIN_REQUEST,
    payload
  }
};

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authTypes.AUTH_LOGIN_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function logoutRequest() {
    localStorage.removeItem('token');
    return {
        type: authTypes.AUTH_LOGOUT
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logoutRequest());
        dispatch(push('/home'));
    }
}
