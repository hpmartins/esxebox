import * as authTypes from './authTypes';
import {createReducer} from '../internal/utils';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    username: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [authTypes.AUTH_LOGIN_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [authTypes.AUTH_LOGIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'username': jwtDecode(payload.token).identity,
            'statusText': payload.message
        });

    },
    [authTypes.AUTH_LOGIN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'username': null,
            'statusText': payload.message,
        });
    },
    [authTypes.AUTH_LOGOUT]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'username': null,
            'statusText': authTypes.AUTH_LOGOUT,
        });
    },
    [authTypes.AUTH_CLEAR_STATUS]: (state, payload) => {
        return {...state, statusText: null};
    }
});
