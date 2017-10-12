import React, { Component } from 'react';
import Highcharts from 'highstock-release';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, AreaSplineSeries, Navigator
} from 'react-jsx-highstock';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import DateRangePickers from './DateRangePickers';
import { createRandomData } from '../utils/data-helpers';
import './index.css';

class App extends Component {

  constructor (props) {
    super(props);

    const now = Date.now();
    this.state = {
      data1: createRandomData(now, 1e8)
    };
  }

  render() {
    const { data1 } = this.state;

    return (
      <div className="app">
        <HighchartsStockChart className="custom-component-chart">
          <Chart zoomType="x" />

          <Title>Custom Components</Title>

          <Subtitle>react-day-picker Date Pickers</Subtitle>

          <Legend>
            <Legend.Title>Key</Legend.Title>
          </Legend>

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="price">
            <YAxis.Title>Price</YAxis.Title>
            <AreaSplineSeries id="profit" name="Profit" data={data1} />
          </YAxis>

          <DateRangePickers axisId="xAxis" />

          <Navigator>
            <Navigator.Series seriesId="profit" />
          </Navigator>
        </HighchartsStockChart>

        <div className="alert alert-info" role="alert">
          <p>
            This custom component is now available as an add-on NPM package:
            <a href="https://npmjs.com/package/react-jsx-highstock-datepickers" target="_blank"><code>react-jsx-highstock-datepickers</code></a>
          </p>
        </div>

        <ExampleCode name="CustomComponent">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
