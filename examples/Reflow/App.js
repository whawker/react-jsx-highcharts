import React, { Component } from 'react';
import Resizable from 're-resizable';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, SplineSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import './index.css';

const plotOptions =  {
  spline: {
    pointInterval: 3600000, // one hour
    pointStart: Date.UTC(2017, 10, 31, 0, 0, 0)
  }
};

class App extends Component {

  handleResize = () => {
    this.chart.reflow();
  }

  getChart = chart => {
    this.chart = chart;
  }

  render () {
    return (
      <div className="app">
        <Resizable
          className="box" defaultSize={{ width: 615, height: 400 }} handleClasses={{ bottomRight: 'handle-se' }}
          maxWidth={750} maxHeight={500}  minWidth={300} minHeight={200}
          onResizeStop={this.handleResize} lockAspectRatio>

          <div className="chart-container">
            <HighchartsChart plotOptions={plotOptions} callback={this.getChart}>
              <Chart type="spline" height="65%" />

              <Title>Reflow</Title>

              <Subtitle>Resize the chart on demand</Subtitle>

              <XAxis type="datetime">
                <XAxis.Title>Time</XAxis.Title>
              </XAxis>

              <YAxis>
                <YAxis.Title>Frequency</YAxis.Title>
                <SplineSeries data={[0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6]} />
              </YAxis>
            </HighchartsChart>
          </div>

        </Resizable>

        <ExampleCode name="Reflow">{code}</ExampleCode>
      </div>
    );
  }
}


export default withHighcharts(App, Highcharts);
