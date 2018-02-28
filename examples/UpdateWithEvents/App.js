import React, { Component } from 'react';
import MyChart from './MyChart';

const data1 = [1, 2, 3, 4, 5];
const data2 = [1, 1, 1, 1, 1];

class App extends Component {
  state = {
    isToggleOn: true,
    data: data1,
    toolTipEnabledFor: 1
  };

  handleToggle = () => {
    const isToggleOn = !this.state.isToggleOn;

    this.setState({
      isToggleOn,
      data: isToggleOn ? data1 : data2,
      toolTipEnabledFor: isToggleOn ? 1 : 2
    });
  };

  render() {
    const { data, toolTipEnabledFor } = this.state;

    return (
      <div className="app">
        <button onClick={this.handleToggle}>Change Dataset</button>
        <MyChart data={data} toolTipEnabledFor={toolTipEnabledFor} />
      </div>
    );
  }
}

export default App;
