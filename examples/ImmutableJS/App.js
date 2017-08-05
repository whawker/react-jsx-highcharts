import React, { Component } from 'react';
import Immutable from 'immutable';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { createRandomData, createDataPoint } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this);

    const now = Date.now();
    this.state = {
      data1: Immutable.List(createRandomData(now)),
      data2: Immutable.List(createRandomData(now)),
      liveUpdate: false
    };
  }

  componentDidMount () {
    this.handleStartLiveUpdate();
  }

  updateLiveData () {
    const { data1, data2 } = this.state;

    this.setState({
      data1: data1.push(createDataPoint()),
      data2: data2.push(createDataPoint())
    });
  }

  handleStartLiveUpdate (e) {
    e && e.preventDefault();
    this.setState({
      liveUpdate: window.setInterval(this.updateLiveData, 1000)
    });
  }

  handleStopLiveUpdate (e) {
    e.preventDefault();
    window.clearInterval(this.state.liveUpdate);
    this.setState({
      liveUpdate: false
    });
  }

  render() {
    const { data1, data2, liveUpdate } = this.state;

    return (
      <div className="app">

        <HighchartsChart>
          <Chart />

          <Title>Dynamically updating data (2)</Title>

          <Subtitle>Using Immutable.js Lists for data</Subtitle>

          <Legend>
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="pressure">
            <YAxis.Title>Pressure (m)</YAxis.Title>
            <LineSeries id="p1" name="Sensor 1" data={data1} color="#6dbcdb" />
            <LineSeries id="p2" name="Sensor 2" data={data2} color="#ce424b" />
          </YAxis>
        </HighchartsChart>

        <div>
          {!liveUpdate && (
            <button className="btn btn-success" onClick={this.handleStartLiveUpdate}>Live update</button>
          )}
          {liveUpdate && (
            <button className="btn btn-danger" onClick={this.handleStopLiveUpdate}>Stop update</button>
          )}
        </div>

        <ExampleCode name="ImmutableJS">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
