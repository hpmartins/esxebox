import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBar(props) {
  const { children } = props;
  const classes = useStyles();

  return (
      <MuiAppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {Children.count(children) === 0 ? (
              <Typography
                  variant="title"
                  color="inherit"
                  className={classes.title}
                  id="title"
              />
          ) : (
              children
          )}
          <IconButton color="inherit">
            <Badge>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </MuiAppBar>
  );
}


export default AppBar;
