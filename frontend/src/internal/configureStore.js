import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from './rootReducer';
import sagas from './sagas'

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
}

const enhancers = [];
const middleware = [
  routerMiddleware(history),
  sagaMiddleware
];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers
);

const finalReducer = combineReducers({
  router: connectRouter(history),
  root: rootReducer
});
const persistedReducer = persistReducer(persistConfig, finalReducer)

export default () => {
  const store = createStore(persistedReducer, composedEnhancers);
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  return { store, history, persistor };
};
