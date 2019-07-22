import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { withDataProvider } from 'react-admin';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import Visualize from './Visualize';


class VisualizeTab extends Component {
  state = {
    file: null,
  };

  handleChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = event => {
      this.setState({file: event.target.result});
    }
    reader.readAsText(file)
  }

  render() {
    const { file } = this.state;

    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={8}>
          <input
            style={{display: 'none'}}
            id="contained-button-file"
            type="file"
            onChange={this.handleChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
          <div>{file}</div>
          </Grid>
          <Grid item xs={4}>
          <Paper>
            <div style={{height:"30vw"}}><Visualize /></div>
          </Paper>
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
)(VisualizeTab);
