import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { theme, routes } from './config';
import { store, history } from './internals'

import Layout from './layout';

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout routes={routes} />
        </ThemeProvider>
      </Router>
    </Provider>
    );
  }
}
