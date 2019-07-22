import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Grid from '@material-ui/core/Grid';

import { withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';


class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card>
                <CardHeader title="Test" />
                <CardContent>Test</CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    version: state.admin.ui.viewVersion,
});

export default compose(
    connect(mapStateToProps),
    withDataProvider
)(Dashboard);
