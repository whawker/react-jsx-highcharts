import React, { Component } from 'react';
import {
  HighchartsStockChart, Chart, XAxis, YAxis, Title, Subtitle, Legend, AreaSplineSeries, Navigator
} from '../..';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import DateRangePickers from './DateRangePickers';
import { createRandomData } from '../utils/data-helpers';

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
        <HighchartsStockChart>
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

        <ExampleCode name="CustomComponent">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
