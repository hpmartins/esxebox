import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { theme, routes } from './config';

import Layout from './layout';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout routes={routes} />
      </ThemeProvider>
    );
  }
}
