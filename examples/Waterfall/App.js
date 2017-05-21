import React, { Component } from 'react';
import { PrismCode } from 'react-prism';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Tooltip, WaterfallSeries
} from '../..';

class App extends Component {

  render() {
    const waterfallData = [{
      name: 'Start',
      y: 120000
    }, {
      name: 'Product Revenue',
      y: 569000
    }, {
      name: 'Service Revenue',
      y: 231000
    }, {
      name: 'Positive Balance',
      isIntermediateSum: true
    }, {
      name: 'Fixed Costs',
      y: -342000
    }, {
      name: 'Variable Costs',
      y: -233000
    }, {
      name: 'Balance',
      isSum: true
    }];

    return (
      <div className="app">
        <HighchartsChart>
          <Chart />

          <Title>Highcharts Waterfall</Title>

          <Tooltip pointFormat="<b>${point.y:,.2f}</b> USD" />

          <XAxis id="x" type="category" />

          <YAxis id="number">
            <YAxis.Title>USD</YAxis.Title>
            <WaterfallSeries id="waterfall" data={waterfallData} pointPadding={0} />
          </YAxis>
        </HighchartsChart>

        <pre>
          <PrismCode className="language-jsx">{`
const pieData = [{
  name: 'Jane',
  y: 13
}, {
  name: 'John',
  y: 23
}, {
  name: 'Joe',
  y: 19
}];

return (
  <HighchartsChart>
    <Chart />

    <Title>Combination chart</Title>

    <Legend />

    <XAxis id="x" type="category" categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

    <YAxis id="number">
      <ColumnSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
      <ColumnSeries id="john" name="John" data={[2, 3, 5, 7, 6]} />
      <ColumnSeries id="joe" name="Joe" data={[4, 3, 3, 9, 0]} />
      <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
      <PieSeries id="total-consumption" name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
    </YAxis>
  </HighchartsChart>
);
        `}</PrismCode>
        </pre>
      </div>
    );
  }
}

export default App;
