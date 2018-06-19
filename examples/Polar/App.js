import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, XAxis, YAxis, Title, Pane, ColumnSeries, LineSeries, AreaSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const plotOptions = {
  series: {
    pointStart: 0,
    pointInterval: 45
  },
  column: {
    pointPadding: 0,
    groupPadding: 0
  }
}

const labelFormatter = function () { return this.value + '°'; }

const App = () => (
  <div className="app">
    <HighchartsChart polar plotOptions={plotOptions}>
      <Title>Highcharts Polar Chart</Title>

      <Pane startAngle={0} endAngle={360} />

      <XAxis tickInterval={45} min={0} max={360} labels={{ formatter: labelFormatter }} />

      <YAxis min={0}>
        <ColumnSeries name="Column" data={[8, 7, 6, 5, 4, 3, 2, 1]} pointPlacement='between' />
        <LineSeries name="Line" data={[1, 2, 3, 4, 5, 6, 7, 8]} />
        <AreaSeries name="Area" data={[1, 8, 2, 7, 3, 6, 4, 5]} />
      </YAxis>
    </HighchartsChart>

    <ExampleCode name="Gauge">{code}</ExampleCode>
  </div>
);

export default withHighcharts(App, Highcharts);
