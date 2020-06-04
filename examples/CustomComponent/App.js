import * as React from 'react';
import { Component } from 'react';
import Highcharts from 'highcharts/highstock';
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

          <YAxis>
            <YAxis.Title>Price</YAxis.Title>
            <AreaSplineSeries id="profit" name="Profit" data={data1} />
          </YAxis>

          <DateRangePickers />

          <Navigator>
            <Navigator.Series seriesId="profit" />
          </Navigator>
        </HighchartsStockChart>

        <ExampleCode name="CustomComponent">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
