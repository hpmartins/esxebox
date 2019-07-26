import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AppBar from './AppBar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
  },
  link: {
      textDecoration: 'none',
      alignItems: 'center',
  },
  button: {
    color: 'white',
  },
}));

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

export default function Layout(props) {
  const classes = useStyles();
  const routes = props.routes;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
      <Box border={1} borderColor="grey.600">
        <Box borderBottom={1} borderColor="grey.600">
          <AppBar>
            {(routes && routes.map((route, index) => (
              route.path ? (<SideBarItem key={route.name} route={route} />) : ('')
            )))}
          </AppBar>
        </Box>
        <Box component="main" >
            <Switch>
              {(routes && routes.map((route) => (
                  route.path ? (<Route key={route.path} exact={route.exact} path={route.path} component={route.component} />) : ('')
              )))}
            </Switch>
        </Box>
      </Box>
      </Container>
    </div>
  );
}
