import { combineReducers } from 'redux';

// Custom routers
import { yxroAppReducer } from '../YXRO';

// Auth Reducer
import authReducer from '../auth/authReducer';

export default combineReducers({
  yxro: yxroAppReducer,
  auth: authReducer,
})
