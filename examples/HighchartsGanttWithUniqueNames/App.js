import React, { Component } from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import { GanttSeries, HighchartsGanttChart, Subtitle, YAxis,Title, withHighcharts } from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const today = new Date();
const day = 1000 * 60 * 60 * 24;
const start = new Date(today.getTime() - (day*7));
const hours = 1000 * 60 * 60;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);

class App extends Component {

  render () {
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Highcharts Gantt with unique names</Title>
          <YAxis>
            <GanttSeries
              name="Project 1"
              data={
                [
                  {
                    name: 'C138',
                    start: start.getTime(),
                    end: start.getTime() + (1 * hours),
                    y: 1
                  },
                  {
                    name: 'B1234',
                    start: start.getTime() + (1 * hours),
                    end: start.getTime() + (2 * hours),
                    y: 2
                  },
                  {
                    name: 'B345',
                    start: start.getTime(),
                    end: start.getTime() + (1 * hours),
                    y: 3
                  },
                  {
                    name: 'B345',
                    start: start.getTime() + (3 * hours),
                    end: start.getTime() + (4 * hours),
                    y: 3
                  },
                  {
                    name: 'A5693',
                    start: start.getTime() + (5 * hours),
                    end: start.getTime() + (6 * hours),
                    y: 4
                  },
                  {
                    name: 'A1',
                    start: start.getTime() + (3 * hours),
                    end: start.getTime() + (4 * hours),
                    y: 5
                  },
                  {
                    name: 'A1',
                    start: start.getTime() + (6 * hours),
                    end: start.getTime() + (7 * hours),
                    y: 5
                  }
                ]
              }
            />
          </YAxis>
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
