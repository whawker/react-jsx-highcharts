import React, { Component } from 'react'
import { Fetch } from 'react-request'
import Highmaps from 'highcharts/highmaps'
import {
  HighchartsMapChart, withHighmaps, Title, Subtitle, Tooltip, MapSeries, MapNavigation, Credits
} from 'react-jsx-highmaps'

const labelFormatter = function () {
  if (this.point.value) {
    return this.point.name
  }
}

const App = () => (
  <div className="app">
    <Fetch url="https://code.highcharts.com/mapdata/custom/europe.geo.json">
      {({ fetching, failed, data }) => {
        if (fetching) {
          return <div>Loading…</div>
        }

        if (failed) {
          return <div>Failed to load map.</div>
        }

        if (data) {
          return (
            <HighchartsMapChart map={data}>
              <Title>Nordic countries</Title>

              <Subtitle>Demo of drawing all areas in the map, only highlighting partial data</Subtitle>

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

              <MapNavigation>
                <MapNavigation.ZoomIn/>
                <MapNavigation.ZoomOut/>
              </MapNavigation>

              <Tooltip/>

              <Credits/>
            </HighchartsMapChart>
          )
        }

        return null
      }}
    </Fetch>
  </div>
)

export default withHighmaps(App, Highmaps)
