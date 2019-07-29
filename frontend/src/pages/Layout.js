import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import WavesIcon from '@material-ui/icons/Waves';
import Typography from '@material-ui/core/Typography';

import Home from './Home';
import Login from './Login';
import Error404 from './Error404';
import YXRO from '../YXRO';

import PrivateRoute from '../auth/PrivateRoute';

import * as authActions from '../auth/authActions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginBottom: theme.spacing(2),
    height: '85vh',
  },
  link: {
      textDecoration: 'none',
      alignItems: 'center',
      color: 'white',
  },
  button: {
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
  appbar: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
}));


const LoginLogoutButton = connect(state => {
  return {
    auth: state.root.auth,
  }
}, null)(props => {
  const classes = useStyles();

  const logoutAndRedirect = () => {
    props.dispatch(authActions.logoutRequest());
    props.dispatch(push('/home'));
  }

  return (
    <>
    {props.auth.isAuthenticated
     ? (<>
       <NavLink
           exact
           to="/wrongpath"
           className={classes.link}>
           <Button className={classes.button}>{props.auth.userName}</Button>
       </NavLink>
       <Button
            className={classes.button}
            onClick={() => logoutAndRedirect()}>
            Logout
       </Button>
       </>
     )
    : <NavLink
        exact
        to="/login"
        className={classes.link}>
           <Button className={classes.button}>Login</Button>
      </NavLink>
  }
    </>
  );
});

function AppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.appbar}>
      <MuiAppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <WavesIcon />
          </IconButton>
          <Link to="/home" className={classes.link}><Typography variant="h6">esXebox</Typography></Link>
          <div className={classes.grow} />
          { props.auth.isAuthenticated ? <AppBarButton path="/yxro" name="YXRO" /> : ''}
          <div className={classes.grow} />
          <LoginLogoutButton auth={props.auth} />
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}

function AppBarButton(props) {
  const classes = useStyles();
  return (
    <NavLink
        exact
        to={props.path}
        className={classes.link}>
        <Button className={classes.button}>{props.name}</Button>
    </NavLink>
  );
}

function AppContent(props) {
  const classes = useStyles();

  return (
    <main className={classes.main}>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Redirect exact from="/" to="/home" />
          <Route path="/login" component={Login} />
          <PrivateRoute path='/yxro' component={YXRO} />
          <Route component={Error404} />
        </Switch>
    </main>
  );
}

function AppFooter() {
  const classes = useStyles();
  return (
      <footer className={classes.footer}>
        <Typography align='center' variant="overline" display="block" gutterBottom>© 2019 ALS/LBNL</Typography>
      </footer>
  );
}

function Layout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar auth={props.auth} />
        <AppContent/>
      </Container>
      <AppFooter/>
    </div>
  );
}

export default connect(state => {
  return {
    auth: state.root.auth,
  }
}, null)(Layout);
