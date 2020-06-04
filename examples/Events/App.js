import * as React from 'react';
import { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ScatterSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { addDataPoint } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.state = {
      userClicks: [],
      clickCounter: 0
    };
  }

  handleClick (e) {
    this.setState({
      userClicks: addDataPoint(this.state.userClicks, [e.xAxis[0].value, e.yAxis[0].value]),
      clickCounter: this.state.clickCounter + 1
    });
  }

  handleShow () {
    alert('Series shown');
  }

  handleHide () {
    alert('Series hidden');
  }

  render() {
    const myClicks = [
      [154, 97],
      [458, 235],
      [314, 127],
      [430, 207],
      [196, 113],
      [354, 223],
      [444, 253],
      [182, 59],
      [244, 249],
      [414, 253],
      [458, 209]
    ];
    const { userClicks, clickCounter } = this.state;

    return (
      <div className="app">

        <HighchartsChart>
          <Chart zoomType="xy" onClick={this.handleClick} />

          <Title>Click to add data</Title>

          <Legend>
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis>
            <XAxis.Title>X Coord</XAxis.Title>
          </XAxis>

          <YAxis>
            <YAxis.Title>Y Coord</YAxis.Title>
            <ScatterSeries name="My clicks" data={myClicks} />
            <ScatterSeries name="Your clicks" data={userClicks} onHide={this.handleHide} onShow={this.handleShow} />
          </YAxis>
        </HighchartsChart>
        <p>Click count: <span>{clickCounter}</span></p>

        <ExampleCode name="Events">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
