import * as authTypes from './authTypes';
import {createReducer} from '../internal/utils';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
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
            'userName': jwtDecode(payload.token).identity,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [authTypes.AUTH_LOGIN_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${payload.message}`
        });
    },
    [authTypes.AUTH_LOGOUT]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });
    },
    [authTypes.AUTH_CLEAR_STATUS]: (state, payload) => {
        return {...state, statusText: null};
    }
});
