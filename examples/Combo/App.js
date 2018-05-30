import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

class App extends Component {

  render() {
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
      <div className="app">
        <HighchartsChart>
          <Chart />

          <Title>Combination chart</Title>

          <Legend />

          <XAxis categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

          <YAxis>
            <ColumnSeries name="Jane" data={[3, 2, 1, 3, 4]} />
            <ColumnSeries name="John" data={[2, 3, 5, 7, 6]} />
            <ColumnSeries name="Joe" data={[4, 3, 3, 9, 0]} />
            <SplineSeries name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
            <PieSeries name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
          </YAxis>
        </HighchartsChart>

        <ExampleCode name="Combo">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
