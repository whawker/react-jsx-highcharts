import React, { Component } from 'react';
import {
  HighchartsChart, Title, FunnelSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

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

        <ExampleCode name="Funnel">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
