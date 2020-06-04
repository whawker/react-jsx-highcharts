import * as React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, Chart, XAxis, YAxis, Title, Subtitle, StreamGraphSeries, Tooltip
} from 'react-jsx-highcharts';
import data from './data';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const hosts = [
  '',
  '1924 Chamonix',
  '1928 St. Moritz',
  '1932 Lake Placid',
  '1936 Garmisch-Partenkirchen',
  '1940 <i>Cancelled (Sapporo)</i>',
  '1944 <i>Cancelled (Cortina d\'Ampezzo)</i>',
  '1948 St. Moritz',
  '1952 Oslo',
  '1956 Cortina d\'Ampezzo',
  '1960 Squaw Valley',
  '1964 Innsbruck',
  '1968 Grenoble',
  '1972 Sapporo',
  '1976 Innsbruck',
  '1980 Lake Placid',
  '1984 Sarajevo',
  '1988 Calgary',
  '1992 Albertville',
  '1994 Lillehammer',
  '1998 Nagano',
  '2002 Salt Lake City',
  '2006 Turin',
  '2010 Vancouver',
  '2014 Sochi'
];

const App = () => {

  const plotOptions = {
    series: {
      label: {
        minFontSize: 5,
          maxFontSize: 15,
          style: {
          color: 'rgba(255,255,255,0.75)'
        }
      }
    }
  };

  return (
    <div className="app">
      <HighchartsChart plotOptions={plotOptions}>
        <Chart marginBottom={30} zoomType="x" />

        <Title floating align="left">Winter Olympic Medal Wins</Title>

        <Subtitle floating align="left" y={30}>Source: sports-reference.com</Subtitle>

        <XAxis type="category" categories={hosts} labels={{ align: 'left', reserveSpace: false, rotation: 270 }} lineWidth={0} tickWidth={0} margin={20} crosshair />

        <YAxis visible={false} startOnTick={false} endOnTick={false}>
          {Object.keys(data).map(country => (
            <StreamGraphSeries key={country} name={country} data={data[country].data} color={data[country].color} />
          ))}
        </YAxis>

        <Tooltip />
      </HighchartsChart>

      <ExampleCode name="StreamGraph">{code}</ExampleCode>
    </div>
  );
}

export default withHighcharts(App, Highcharts);
