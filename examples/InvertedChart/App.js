import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, AreaSplineSeries, Tooltip
} from 'react-jsx-highcharts';
import range from 'lodash/range';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

Highcharts.setOptions({
  lang: { thousandsSep: '' }
});

// Generates 1992-93 through 2017-18
const seasons = range(0, 26).map(k => {
  const year = k + 1992;
  return `${year}-${(year + 1).toString().substr(2)}`
});

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      seasons,
      totalGoals: [
        1222, 1195, 1195, 988, 970, 1019, 959, 1060, 992, 1001, 1000, 1012, 974,
        944, 931, 1002, 942, 1053, 1063, 1066, 1063, 1052, 975, 1026, 1064, 1018
      ],
      avgGoalsPerGame: [
        2.65, 2.59, 2.59, 2.6, 2.55, 2.68, 2.52, 2.79, 2.61, 2.63, 2.63, 2.66, 2.56,
        2.48, 2.45, 2.64, 2.48, 2.77, 2.8, 2.81, 2.8, 2.77, 2.57, 2.7, 2.8, 2.68
      ]
    };
  }

  render() {
    const plotOptions = {
      areaspline: {
        fillOpacity: 1,
        lineWidth: 0,
        marker: {
          enabled: false,
          states: {
            hover: { enabled: false }
          }
        }
      }
    };

    const positioner = (w, h, point) => ({x: 0, y: point.plotY + (h / 2) + 8});

    const { seasons, totalGoals, avgGoalsPerGame } = this.state;

    return (
      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Chart inverted marginLeft={300} height={650} />

          <Title>Premier League Goal Stats: 1992-93 to 2017-18</Title>

          <Subtitle>Source: myfootballfacts.com</Subtitle>

          <XAxis type="category" categories={seasons} crosshair={{ zIndex: 10 }} lineWidth={0} tickLength={0}>
            <XAxis.Title>Season</XAxis.Title>
          </XAxis>

          <YAxis min={800} gridLineWidth={0} labels={{ enabled: false }}>
            <AreaSplineSeries name="Total Goals" data={totalGoals} color="#38003c" />
          </YAxis>

          <YAxis min={2.4} max={7} gridLineWidth={0} labels={{ enabled: false }}>
            <AreaSplineSeries name="Average Goals per Game" data={avgGoalsPerGame} color="#e90052" />
          </YAxis>

          <Tooltip shared positioner={positioner} backgroundColor="transparent" borderWidth={0} shadow={false} />
        </HighchartsChart>

        <ExampleCode name="InvertedChart">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
