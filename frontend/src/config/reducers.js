import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

// Custom routers
import { yxroAppReducer } from '../apps/YXRO';

export default (history) => combineReducers({
  router: connectRouter(history),
  yxro: yxroAppReducer,
});
