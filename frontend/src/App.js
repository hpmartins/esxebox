import React from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react'
import { createMuiTheme } from '@material-ui/core/styles';

import { loginUserSuccess } from './auth/authActions';
import configureStore from './internal/configureStore'
import Layout from './pages/Layout';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const { store, history, persistor } = configureStore();

const token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={createMuiTheme()}>
            <Layout/>
          </ThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
    );
  }
}
