import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { getLayersSaga, setLayers } from './actions';

import download from './download2';

import SampleCanvas from './SampleCanvas';
import TableTest from './TableTest';

import Button from './Button';

class LoadParFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.props.onUploadParfile(e.target.result);
      }
      reader.readAsText(file);
      event.target.value = null;
    }
  }
  render() {
    return (
      <>
        <input
          id="raised-button-file"
          type="file"
          accept="par"
          style={{display: 'none'}}
          onChange={this.handleChange}
        />
      <label htmlFor="raised-button-file">
        <Button component="span" color="primary" variant="outlined">
          Load .par file
        </Button>
      </label>
    </>
    );
  }
}
const LoadParFileButton = connect(
  null,
  dispatch => ({onUploadParfile: parfile => dispatch(getLayersSaga(parfile))})
)(LoadParFileInput);


class LoadJsonFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (e) => {
        this.props.onUploadJsonFile(JSON.parse(e.target.result));
      }
      reader.readAsText(file);
      event.target.value = null;
    }
  }
  render() {
    return (
      <>
        <input
          id="raised-button-json"
          type="file"
          accept="json"
          style={{display: 'none'}}
          onChange={this.handleChange}
        />
      <label htmlFor="raised-button-json">
        <Button component="span" color="primary" variant="outlined">
          Load .json file
        </Button>
      </label>
    </>
    );
  }
}
const LoadJsonFileButton = connect(
  null,
  dispatch => ({onUploadJsonFile: layers => dispatch(setLayers(layers))})
)(LoadJsonFileInput);


function SaveJsonFile(props) {
  const layers = props.layers;
  return (
    <>
    <Button component="span" color="primary" variant="outlined" onClick={() => {download(JSON.stringify(layers, null, 4), 'params.json', 'application/json')}}>
      Save .json file
    </Button>
    </>
  );
}

function VisualizeTab(props) {
  const layers = props.layers;

  const columns = [
    {
      key: "index",
      name: "ID",
      width: 50,
    },
    {
      key: "Name",
      name: "Name",
      width: 150,
      editable: true,
    },
    {
      key: "Thickness",
      name: "Thickness",
      width: 80,
      editable: true,
    },
    {
      key: "Density",
      name: "Density",
      width: 80,
      editable: true,
    }
  ];

  return (
    <div>
        <Grid container spacing={0} direction="row" alignItems="stretch">
          <Grid item xs={3}>
            <Box p={0}>
              <div style={{ height: "75vh" }}><SampleCanvas /></div>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box border={0} margin={1}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container spacing={6} direction="row" alignItems="stretch" justify="space-evenly">
                    <Grid item>
                        <LoadParFileButton />
                    </Grid>
                    { false &&
                    <Grid item>
                        <LoadJsonFileButton />
                    </Grid> }
                    { false &&
                    <Grid item>
                        <SaveJsonFile layers={layers} />
                    </Grid> }
                  </Grid>
                </Grid>
                <Grid item align="center">
                  {(layers && layers.length > 0) && (
                    <TableTest
                      data={props.layers}
                      rowKey="index"
                      columns={columns}
                      onRowsUpdated={a => props.setLayers(a)}
                    />
                  )}
                </Grid>
            </Grid>
          </Box>
          </Grid>
        </Grid>
    </div>
  );
}

export default connect(state => {
  return {
    layers: state.root.yxro.layers,
  }
},
dispatch => ({setLayers: layers => dispatch(setLayers(layers))}))(VisualizeTab);
