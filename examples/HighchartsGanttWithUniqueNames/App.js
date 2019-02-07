import React from 'react';
import startOfToday from 'date-fns/start_of_today';
import subWeeks from 'date-fns/sub_weeks';
import Highcharts from 'highcharts/highcharts-gantt';
import { GanttSeries, HighchartsGanttChart, Subtitle, YAxis,Title, withHighcharts } from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const start = subWeeks(startOfToday(), 1).getTime();
const hours = 60 * 60 * 1000;

const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Highcharts Gantt with unique names</Title>
      <YAxis>
        <GanttSeries
          name="Project 1"
          data={[
            {
              name: 'C138',
              start: start,
              end: start + (1 * hours)
            },
            {
              name: 'B1234',
              start: start + (1 * hours),
              end: start + (2 * hours)
            },
            {
              name: 'B345',
              start: start,
              end: start + (1 * hours)
            },
            {
              name: 'B345',
              start: start + (3 * hours),
              end: start + (4 * hours)
            },
            {
              name: 'A5693',
              start: start + (5 * hours),
              end: start + (6 * hours)
            },
            {
              name: 'A1',
              start: start + (3 * hours),
              end: start + (4 * hours)
            },
            {
              name: 'A1',
              start: start + (6 * hours),
              end: start + (7 * hours)
            }
          ]}
        />
      </YAxis>
    </HighchartsGanttChart>

    <ExampleCode name="Gantt">{code}</ExampleCode>
  </div>
);

export default withHighcharts(App, Highcharts);
