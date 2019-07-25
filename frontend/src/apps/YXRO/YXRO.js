import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import VisualizeTab from './VisualizeTab'

function TabContainer(props) {
  const TabComponent = props.content;
  return (
    <TabComponent />
  );
}

const tabs = [
  {
    id: 0,
    name: 'Visualize',
    content: VisualizeTab,
  },
  {
    id: 1,
    name: 'Dashboard',
    content: VisualizeTab,
  },
  {
    id: 2,
    name: 'Test',
    content: VisualizeTab,
  }
]

class YXRO extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 0,
    };
  }

  handleChange(event, val) {
    this.setState({ value: val });
  }

  render() {
    const { value } = this.state;

    return (
      <>
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
      </>
    );
  }
}

export default YXRO;
