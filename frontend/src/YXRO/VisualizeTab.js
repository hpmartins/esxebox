import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { getLayersSaga, setLayers } from './actions';

import download from './download2';

import SampleCanvas from './SampleCanvas';
import TableTest from './TableTest';
import { ColorEditor } from './TableTest';

import {ColorPicker} from 'primereact/colorpicker';

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

function ColorFormatter({ value, row }) {
  return <span style={{'display':'inline-block', 'width':'20px','height':'20px','verticalAlign':'middle','backgroundColor': value}}></span>;
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function VisualizeTab(props) {
  const layers = props.layers;
  const classes = useStyles();

  const columns = [
    {
      key: "Color",
      name: "Color",
      width: 50,
      formatter: ColorFormatter,
      editor: ColorEditor,
    },
    {
      key: "Name",
      name: "Name",
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
    },
  ];

  return (
    <div className={classes.root}>
        <Grid container spacing={0} direction="row" justify="center" alignItems="stretch">
          <Grid item xs={3}>
            <Box border={0} p={0} margin={0}>
              <div style={{ height: "75vh" }}><SampleCanvas /></div>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box border={0} p={0}>
              <div style={{ height: "75vh" }}>
              <Grid container direction="column" alignItems="center" justify="center">
                <Grid item xs>
                  <Grid container spacing={4} alignItems="center" justify="center" className={classes.paper}>
                    <Grid item>
                        <LoadParFileButton />
                    </Grid>
                    {
                    <Grid item>
                        <LoadJsonFileButton />
                    </Grid> }
                    {
                    <Grid item>
                        <SaveJsonFile layers={layers} />
                    </Grid> }
                  </Grid>
                </Grid>
                <Grid item xs className={classes.paper}>
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
            </div>
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
