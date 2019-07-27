import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { theme, routes } from './config';
import { store, history } from './internals'

import Layout from './layout';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Layout routes={routes} />
        </ThemeProvider>
      </Router>
    </Provider>
    );
  }
}
