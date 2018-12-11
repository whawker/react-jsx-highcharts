import React, { Component } from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import { HighchartsGanttChart, Subtitle, Title, GanttSeries, XAxis, YAxis, withHighcharts } from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';


const today = new Date();
const day = 1000 * 60 * 60 * 24;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);

const seriesData = [{
  name: 'Planning',
  id: 'planning',
  start: today.getTime(),
  end: today.getTime() + (20 * day),
  y: 0
}, {
  name: 'Requirements',
  id: 'requirements',
  parent: 'planning',
  start: today.getTime(),
  end: today.getTime() + (5 * day),
  y: 1
}, {
  name: 'Design',
  id: 'design',
  dependency: 'requirements',
  parent: 'planning',
  start: today.getTime() + (3 * day),
  end: today.getTime() + (20 * day),
  y: 2
}, {
  name: 'Layout',
  id: 'layout',
  parent: 'design',
  start: today.getTime() + (3 * day),
  end: today.getTime() + (10 * day),
  y: 3
}, {
  name: 'Graphics',
  parent: 'design',
  dependency: 'layout',
  start: today.getTime() + (10 * day),
  end: today.getTime() + (20 * day),
  y: 4
}, {
  name: 'Develop',
  id: 'develop',
  start: today.getTime() + (5 * day),
  end: today.getTime() + (30 * day),
  y: 5
}, {
  name: 'Create unit tests',
  id: 'unit_tests',
  dependency: 'requirements',
  parent: 'develop',
  start: today.getTime() + (5 * day),
  end: today.getTime() + (8 * day),
  y: 6
}, {
  name: 'Implement',
  id: 'implement',
  dependency: 'unit_tests',
  parent: 'develop',
  start: today.getTime() + (8 * day),
  end: today.getTime() + (30 * day),
  y: 7
}];

class App extends Component {

  render() {
    console.log('cats', seriesData.map(c => c.name))
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Highcharts Gantt With Subtasks</Title>
          <XAxis
            min={today.getTime() - (2 * day)}
            max={today.getTime() + (32 * day)}
          />
          <YAxis categories={seriesData.map(c => c.name)}>
            <GanttSeries name="Project 1" data={seriesData} />
          </YAxis>
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
