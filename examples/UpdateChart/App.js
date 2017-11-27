import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, Chart, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';
import { createRandomData } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: createRandomData(Date.now(), 1e8),
      color: '#FFFFFF',
      shadow: false
    };
  }

  handleToggleBackground = e => {
    e.preventDefault();
    this.setState({
      color: this.state.color === '#FFFFFF' ? '#FF0000' : '#FFFFFF'
    });
  }

  handleToggleShadow = e => {
    e.preventDefault();
    this.setState({
      shadow: !this.state.shadow
    });
  }

  render() {
    const { data, color, shadow } = this.state;

    return (
      <div className="app">

        <HighchartsChart>
          <Title>Toggle Background Color</Title>

          <Chart backgroundColor={color} shadow={shadow} />

          <Legend align="left">
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="price">
            <YAxis.Title>Price</YAxis.Title>
            <LineSeries id="series1" name="Profit" data={data} />
          </YAxis>
        </HighchartsChart>

        <div className="btn-toolbar" role="toolbar">
          <button className="btn btn-primary" onClick={this.handleToggleBackground}>Toggle background color</button>
          <button className="btn btn-primary" onClick={this.handleToggleShadow}>Toggle shadow</button>
        </div>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
