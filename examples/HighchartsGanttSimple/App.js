import React from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import { HighchartsGanttChart, Subtitle, Title, GanttSeries, YAxis, withHighcharts } from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

// from: https://www.highcharts.com/docs/gantt/gantt-task-dependencies

const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Simple Highcharts Gantt</Title>

      <YAxis>
        <GanttSeries name="Project 1" data={[
          {
            id: 's',
            name: 'Start prototype',
            start: Date.UTC(2014, 10, 18),
            end: Date.UTC(2014, 10, 20)
          },
          {
            id: 'b',
            name: 'Develop',
            start: Date.UTC(2014, 10, 20),
            end: Date.UTC(2014, 10, 25)
          },
          {
            id: 'a',
            name: 'Run acceptance tests',
            start: Date.UTC(2014, 10, 23),
            end: Date.UTC(2014, 10, 26)
          },
          {
            name: 'Test prototype',
            start: Date.UTC(2014, 10, 27),
            end: Date.UTC(2014, 10, 29),
            dependency: ['a', 'b']
          }
        ]} />
      </YAxis>
    </HighchartsGanttChart>

    <ExampleCode name="Gantt">{code}</ExampleCode>
  </div>
);

export default withHighcharts(App, Highcharts);
