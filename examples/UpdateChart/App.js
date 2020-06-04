import * as React from 'react';
import { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, Chart, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';
import { createRandomData } from '../utils/data-helpers';

const RED = '#FF0000';
const WHITE = '#FFFFFF';

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: createRandomData(Date.now(), 1e8),
      bgColor: WHITE,
      seriesColor: RED,
      shadow: false
    };
  }

  handleToggleBackground = e => {
    e.preventDefault();
    this.setState({
      bgColor: this.state.bgColor === WHITE ? RED : WHITE,
      seriesColor: this.state.seriesColor === RED ? WHITE : RED
    });
  }

  handleToggleShadow = e => {
    e.preventDefault();
    this.setState({
      shadow: !this.state.shadow
    });
  }

  render() {
    const { data, bgColor, seriesColor, shadow } = this.state;

    return (
      <div className="app">

        <HighchartsChart>
          <Title>Toggle Background Color</Title>

          <Chart backgroundColor={bgColor} shadow={shadow} />

          <Legend align="left">
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Price</YAxis.Title>
            <LineSeries name="Profit" data={data} color={seriesColor} />
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
