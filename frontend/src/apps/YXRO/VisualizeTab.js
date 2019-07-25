import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getLayersSaga } from './actions';

import Visualize from './Visualize';

class FileInput extends React.Component {
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
        <form>
            <input type="file" onChange={this.handleChange} />
        </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onUploadParfile: parfile => dispatch(getLayersSaga(parfile)),
})

const OtherTest = connect(
  null,
  mapDispatchToProps
)(FileInput);


class VisualizeTab extends React.Component {
  render() {
    const layers = JSON.stringify(this.props.layers);

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper>
              <div style={{ height: "75vh" }}><Visualize/></div>
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <OtherTest />
            {layers}
          </Grid>
        </Grid>
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
