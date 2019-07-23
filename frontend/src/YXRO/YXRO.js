import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Dashboard, SomePage } from '../pages';
import VisualizeTab from './VisualizeTab'

function TabContainer(props) {
  const TabComponent = props.content;
  return (
    <TabComponent />
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const tabs = [
  {
    id: 0,
    name: 'Visualize',
    content: VisualizeTab,
  },
  {
    id: 1,
    name: 'Dashboard',
    content: Dashboard,
  },
  {
    id: 2,
    name: 'Test',
    content: SomePage,
  }
]

class YXRO extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {tabs.map(tab => (
              <Tab key={tab.id} value={tab.id} label={tab.name} />
            ))}
          </Tabs>
        </AppBar>
        {tabs.map(tab => (
          value === tab.id && <TabContainer key={tab.id} {...tab} />
        ))}
      </div>
    );
  }
}

YXRO.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YXRO);
