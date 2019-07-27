import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import WavesIcon from '@material-ui/icons/Waves';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginBottom: theme.spacing(2),
    height: '35vw',
  },
  link: {
      textDecoration: 'none',
      alignItems: 'center',
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
}));

function AppBar(props) {
  const { routes } = props;
  const classes = useStyles();

  return (
      <MuiAppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <WavesIcon />
          </IconButton>
          {(routes && routes.map((route, index) => (
            route.path ? (<SideBarItem key={route.name} route={route} />) : ('')
          )))}
        </Toolbar>
      </MuiAppBar>
  );
}

function SideBarItem(props) {
  const { route } = props;
  const classes = useStyles();
  return (
    <NavLink
      to={route.path}
      className={classes.link}
      exact={route.exact}
      activeStyle={{fontWeight: 'bold'}}>
        <Button key={route.name} className={classes.button}>{route.name}</Button>
    </NavLink>
  );
}

function AppContent(props) {
  const { routes } = props;
  const classes = useStyles();
  return (
    <main className={classes.main}>
        <Switch>
          {(routes && routes.map((route) => (
              route.path ? (<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />) : ('')
          )))}
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

export default function Layout(props) {
  const classes = useStyles();
  const routes = props.routes;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar routes={routes} />
        <AppContent routes={routes} />
      </Container>
      <AppFooter/>
    </div>
  );
}
