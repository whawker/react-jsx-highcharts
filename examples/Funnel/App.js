import React, { Component } from 'react';
import { PrismCode } from 'react-prism';
import {
  HighchartsChart, Title, FunnelSeries
} from '../..';

class App extends Component {

  render() {
    const plotOptions = {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          softConnector: true
        },
        center: ['40%', '50%'],
        neckWidth: '30%',
        neckHeight: '25%',
        width: '80%'
      }
    };

    const funnelData = [
      ['Website visits', 15654],
      ['Downloads', 4064],
      ['Requested price list', 1987],
      ['Invoice sent', 976],
      ['Finalized', 846]
    ];

    return (
      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Title>Sales funnel</Title>

          <FunnelSeries id="unique-users" name="Unique users" data={funnelData} />
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
