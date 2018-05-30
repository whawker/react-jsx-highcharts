import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, PlotBand, Legend, SplineSeries, Tooltip
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

class App extends Component {

  constructor (props) {
    super(props);

    this.renderPlotBand = this.renderPlotBand.bind(this);
  }

  renderPlotBand (band, index) {
    const { from, to } = band;
    const id = `${from}-${to}`;
    const color = (index % 2) ? '#FFFFFF' : 'rgba(68, 170, 213, 0.1)';
    return (
      <PlotBand key={id} from={from} to={to} color={color}>
        <PlotBand.Label>{band.label}</PlotBand.Label>
      </PlotBand>
    );
  }

  render() {
    const plotOptions =  {
      spline: {
        lineWidth: 4,
          states: {
          hover: {
            lineWidth: 5
          }
        },
        marker: {
          enabled: false
        },
        pointInterval: 3600000, // one hour
        pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
      }
    };

    const bands = [
      { label: 'Light air', from: 0.5, to: 1.5 },
      { label: 'Light breeze', from: 1.5, to: 3.3 },
      { label: 'Gentle breeze', from: 3.3, to: 5.5 },
      { label: 'Moderate breeze', from: 5.5, to: 8 },
      { label: 'Fresh breeze', from: 8, to: 11 },
      { label: 'Strong breeze', from: 11, to: 14 },
      { label: 'High wind', from: 14, to: 15 }
    ];

    return (
      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Chart type="spline" />

          <Title>Wind speed during two days</Title>

          <Subtitle>May 31 and and June 1, 2015 at two locations in Vik i Sogn, Norway</Subtitle>

          <Legend />

          <Tooltip valueSuffix=" m/s" />

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis minorGridLineWidth={0} gridLineWidth={0} alternateGridColor={null}>
            <YAxis.Title>Wind speed (m/s)</YAxis.Title>
            <SplineSeries name="Hestavollane" data={[0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6]} />
            <SplineSeries name="Vix" data={[0, 0, 0.6, 0.9, 0.8, 0.2, 0, 0, 0, 0.1, 0.6, 0.7, 0.8, 0.6, 0.2, 0, 0.1, 0.3, 0.3, 0, 0.1, 0, 0, 0, 0.2, 0.1, 0, 0.3, 0, 0.1, 0.2, 0.1, 0.3, 0.3, 0, 3.1, 3.1, 2.5, 1.5, 1.9, 2.1, 1, 2.3, 1.9, 1.2, 0.7, 1.3, 0.4, 0.3]} />
            {bands.map(this.renderPlotBand)}
          </YAxis>
        </HighchartsChart>

        <ExampleCode name="SplineWithPlotBands">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
