import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  link: {
      textDecoration: 'none',
      alignItems: 'center',
      color: theme.palette.primary.main,
  },
}));

function SideBarItem(props) {
  const { key, route } = props;
  const classes = useStyles();

  return (
    <NavLink
      to={route.path}
      className={classes.link}
      exact={route.exact}
      activeStyle={{fontWeight: 'bold'}}>
      <ListItem button key={key}>
        {route.icon ? (<ListItemIcon>{route.icon}</ListItemIcon>) : ('')}
          {route.name}
      </ListItem>
  </NavLink>
  );
}

function SideBar(props) {
  const routes = props.routes;
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbarIcon}>
      </div>
      <Divider />
      <List>
        {routes.map((route, index) => (
          route.divider ? (<Divider />) :
          route.header ?  (<ListSubheader inset>{route.name}</ListSubheader>) :
          route.path ? (<SideBarItem key={index} route={route} />) : ('')
        ))}
      </List>
    </Drawer>
  );
}
export default SideBar
