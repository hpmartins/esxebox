import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AppBar from './AppBar';
import SideBar from './SideBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 0,
    height: '100vh',
    width: '100vw',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 100,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const routes = props.routes;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <SideBar routes={routes}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            {(routes && routes.map((route) => (
                route.path ? (<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />) : ('')
            )))}
          </Switch>
        </Container>
      </main>
    </div>
  );
}
