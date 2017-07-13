import React, { Component } from 'react';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { createRandomData, addDataPoint } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this);

    const now = Date.now();
    this.state = {
      data1: createRandomData(now),
      data2: createRandomData(now),
      liveUpdate: false
    };
  }

  componentDidMount () {
    this.handleStartLiveUpdate();
  }

  updateLiveData () {
    const { data1, data2 } = this.state;

    this.setState({
      data1: addDataPoint(data1),
      data2: addDataPoint(data2)
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

          <Title>Dynamically updating data</Title>

          <Legend>
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="pressure">
            <YAxis.Title>Pressure (m)</YAxis.Title>
            <LineSeries id="p1" name="Sensor 1" data={data1} />
            <LineSeries id="p2" name="Sensor 2" data={data2} />
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

        <ExampleCode name="LiveUpdate">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
