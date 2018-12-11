import React, { Component } from 'react';
import {
  GanttSeries,
  Chart,
  HighchartsGanttChart,
  Subtitle,
  Title,
  Tooltip,
  withHighcharts,
  XAxis,
  YAxis
} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const seriesData = [{
  start: Date.UTC(2018, 11, 1),
  end: Date.UTC(2018, 11, 2),
  completed: 0.95,
  name: 'Prototyping',
  y: 0
}, {
  start: Date.UTC(2018, 11, 2),
  end: Date.UTC(2018, 11, 5),
  completed: 0.5,
  name: 'Development',
  y: 1
}, {
  start: Date.UTC(2018, 11, 8),
  end: Date.UTC(2018, 11, 9),
  completed: 0.15,
  name: 'Testing',
  y: 2
}, {
  start: Date.UTC(2018, 11, 9),
  end: Date.UTC(2018, 11, 19),
  completed: {
    amount: 0.3,
    fill: '#fa0'
  },
  name: 'Development',
  y: 1
}, {
  start: Date.UTC(2018, 11, 10),
  end: Date.UTC(2018, 11, 23),
  name: 'Testing',
  y: 2
}]

class App extends Component {

  render () {
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Chart inverted plotBorderWidth={1} />
          <Title>Inverted Gantt Chart</Title>
          <XAxis opposite={false} />
          <YAxis
            categories={seriesData.map(c => c.name)}
            uniqueNames
            opposite
          >
            <GanttSeries name="Project 1" data={seriesData} />
          </YAxis>
          <Tooltip xDateFormat={"%e %b %Y, %H:%M"} />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
