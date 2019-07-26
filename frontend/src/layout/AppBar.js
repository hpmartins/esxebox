import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import WavesIcon from '@material-ui/icons/Waves';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function AppBar(props) {
  const { children } = props;
  const classes = useStyles();

  return (
      <MuiAppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <WavesIcon />
          </IconButton>
          {Children.count(children) === 0 ? ('') : (
              children
          )}
        </Toolbar>
      </MuiAppBar>
  );
}


export default AppBar;
