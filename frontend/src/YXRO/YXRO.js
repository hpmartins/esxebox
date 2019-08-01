import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// PrimeReact
import {ScrollPanel} from 'primereact/scrollpanel';

// Tabs
import VisualizeTab from './VisualizeTab'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    minHeight: '80vh',
  },
}));

const VisualizeJsonTab = connect(state => {
  return {
    yxro: state.root.yxro,
  }
}, null)(props => {
  const json_data = JSON.stringify(props.yxro, null, 4);
  return (
    <>
      <ScrollPanel style={{width: '100%', height: '90%', backgroundColor: 'white'}}>
        <pre>
          {json_data}
        </pre>
      </ScrollPanel>
    </>
  );
});

const HomeTab = connect(state => {
  return {
    yxro: state.root.yxro,
  }
}, null)(props => {
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
                YXRO Main page
              </Typography>
            </Grid>
        </Grid>
    </>
  );
});

function YXRO(props)  {
  const { path } = props.match;
  const [currentTab, setCurrentTab] = useState(path);

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={(e, v) => setCurrentTab(v)}>
          <Tab label="Home" value={`${path}`} component={Link} to={`${path}`} />
          <Tab label="Visualize" value={`${path}/view`} component={Link} to={`${path}/view`} />
          <Tab label="JSON" value={`${path}/json`} component={Link} to={`${path}/json`} />
        </Tabs>
      </AppBar>

      <Switch>
        <Route exact path={`${path}`} component={HomeTab} />
        <Route path={`${path}/view`} component={VisualizeTab} />
        <Route path={`${path}/json`} component={VisualizeJsonTab} />
      </Switch>
    </>
  );
}

export default YXRO;
