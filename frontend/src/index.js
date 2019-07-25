import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { registerServiceWorker } from './internals';
import App from './App';
import { store, history } from './internals'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
document.querySelector('#root'));

registerServiceWorker();
