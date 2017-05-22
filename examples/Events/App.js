import React, { Component } from 'react';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ScatterSeries
} from '../..';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { addDataPoint } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

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

          <XAxis type="linear">
            <XAxis.Title>X Coord</XAxis.Title>
          </XAxis>

          <YAxis id="scatter">
            <YAxis.Title>Y Coord</YAxis.Title>
            <ScatterSeries id="my-clicks" name="My clicks" data={myClicks} />
            <ScatterSeries id="user-clicks" name="Your clicks" data={userClicks} />
          </YAxis>
        </HighchartsChart>
        <p>Click count: <span>{clickCounter}</span></p>

        <ExampleCode name="Events">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
