import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(0),
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <Button {...props} className={classes.button} />
  );
}
