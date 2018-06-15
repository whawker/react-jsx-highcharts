import React, { Component } from 'react';
import Highcharts from 'highcharts/maps/highmaps';
import {
  HighchartsMapChart, withHighcharts, XAxis, YAxis, Title, Subtitle, Tooltip, MapSeries, MapNavigation, Credits
} from 'react-jsx-highmaps';

const labelFormatter = function () {
  if (this.point.value) {
    return this.point.name;
  }
}

const App = () => (
  <div className="app">
    <HighchartsMapChart map="custom/europe">
      <Title>Nordic countries</Title>

      <Subtitle>Demo of drawing all areas in the map, only highlighting partial data</Subtitle>

      <XAxis />

      <YAxis >
        <MapSeries
          name="Area"
          data={[
            ['is', 1],
            ['no', 1],
            ['se', 1],
            ['dk', 1],
            ['fi', 1]
          ]}
          dataLabels={{
            enabled: true,
            color: '#FFFFFF',
            formatter: labelFormatter
          }}
        />
      </YAxis>

      <MapNavigation>
        <MapNavigation.ZoomIn />
        <MapNavigation.ZoomOut />
      </MapNavigation>

      <Tooltip />

      <Credits />
    </HighchartsMapChart>
  </div>
);

export default withHighcharts(App, Highcharts);
