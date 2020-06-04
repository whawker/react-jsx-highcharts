import * as React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Tooltip, Legend, LineSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import './index.css'; // CSS Styles

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const App = () => (
  <div className="app">
    <HighchartsChart styledMode>
      <Chart />

      <Title>Monthly Average Temperature</Title>

      <Subtitle>Source: WorldClimate.com</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

      <Tooltip valueSuffix=" °C" shared />

      <XAxis categories={MONTHS}>
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Temperature (°C)</YAxis.Title>
        <LineSeries name="Tokyo" data={[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]} />
        <LineSeries name="New York" data={[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]} />
        <LineSeries name="Berlin" data={[-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]} />
        <LineSeries name="London" data={[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]} />
        <LineSeries name="Sydney" data={[22.1, 22.1, 21.0, 18.4, 15.3, 12.9, 12.0, 13.2, 15.3, 17.7, 19.5, 21.2]} />
      </YAxis>
    </HighchartsChart>

    <ExampleCode name="StyleByCSS">{code}</ExampleCode>
  </div>
);

export default withHighcharts(App, Highcharts);
