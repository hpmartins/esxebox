import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { registerServiceWorker } from './internals';
import App from './App';
import { store, history } from './internals'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
document.querySelector('#root'));

registerServiceWorker();
