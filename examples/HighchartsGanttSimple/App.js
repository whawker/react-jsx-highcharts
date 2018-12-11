import React, { Component } from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import { HighchartsGanttChart, Subtitle, Title, GanttSeries, YAxis, withHighcharts } from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const seriesData = [{
  id: 's',
  name: 'Start prototype',
  start: Date.UTC(2014, 10, 18),
  end: Date.UTC(2014, 10, 20),
  y: 0
}, {
  id: 'b',
  name: 'Develop',
  start: Date.UTC(2014, 10, 20),
  end: Date.UTC(2014, 10, 25),
  dependency: 's',
  y: 1
}, {
  id: 'a',
  name: 'Run acceptance tests',
  start: Date.UTC(2014, 10, 23),
  end: Date.UTC(2014, 10, 26),
  y: 2
}, {
  name: 'Test prototype',
  start: Date.UTC(2014, 10, 27),
  end: Date.UTC(2014, 10, 29),
  dependency: ['a', 'b'],
  y: 3
}]

// from: https://www.highcharts.com/docs/gantt/gantt-task-dependencies

class App extends Component {

  render () {
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Simple Highcharts Gantt</Title>
          <YAxis categories={seriesData.map(s => s.name)}>
            <GanttSeries name="Project 1" data={seriesData} />
          </YAxis>
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
