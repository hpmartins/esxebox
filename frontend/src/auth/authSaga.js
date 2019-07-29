import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'

import * as authActions from './authActions'
import * as authTypes from './authTypes';

// To log in everyone must pass through these actions
function* loginRequestSaga(action) {
  // Does the login fetch
  const response = yield call(authActions.loginRequest, action.payload);
  if (response.login) {
    yield call(authActions.loginUserSuccess, response.token); // Needs to be called to save token in storage

    // Stores in redux. This is the same as a dispatch(loginUserSucess(token)) anywhere else,
    // but at this time response has all information for login. Message etc
    yield put({type: authTypes.AUTH_LOGIN_SUCCESS, payload: response});

    // Redirects to home after login
    yield put(push('/home'))
  }
  else {
    yield put({type: authTypes.AUTH_LOGIN_FAILURE, payload: response});
  }
}

export default function* watchUserAuthentication() {
  yield takeLatest(authTypes.AUTH_LOGIN_REQUEST, loginRequestSaga);
}
