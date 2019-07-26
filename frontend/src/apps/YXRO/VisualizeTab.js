import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import { getLayersSaga, setLayers } from './actions';

import download from './download2';

import Visualize from './Visualize';

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
        <Button raised component="span" color="primary" variant="outlined">
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
        <Button raised component="span" color="primary" variant="outlined">
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
    <Button raised component="span" color="primary" variant="outlined" onClick={() => {download(JSON.stringify(layers, null, 4), 'params.json', 'application/json')}}>
      Save .json file
    </Button>
    </>
  );
}


class VisualizeTab extends React.Component {
  render() {
    const layers = this.props.layers;

    return (
      <div>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box p={0}>
                <div style={{ height: "75vh" }}><Visualize/></div>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box pt={5}>
                <Grid container spacing={3}>
                  <Grid container spacing={1} direction="column" alignItems="center">
                    <Grid item>
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <LoadParFileButton />
                        <LoadJsonFileButton />
                        <SaveJsonFile layers={layers} />
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    layers: state.yxro.layers,
  }
}

export default connect(mapStateToProps)(VisualizeTab);
