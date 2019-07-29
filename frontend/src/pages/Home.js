import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '80vh',
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
          <Grid item>
            <Typography variant='h4'>
              electronic structure and X-ray experiments sandbox
            </Typography>
          </Grid>
      </Grid>
    </>
  );
}
