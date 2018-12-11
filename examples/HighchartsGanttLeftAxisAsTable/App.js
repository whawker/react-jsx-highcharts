import React, { Component } from 'react';
import Highcharts, { dateFormat } from 'highcharts/highcharts-gantt';
import {
  GanttSeries,
  HighchartsGanttChart,
  Subtitle,
  Title,
  Tooltip,
  withHighcharts,
  XAxis,
  YAxis,
  GridColumn
} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const days = (1000 * 60 * 60 * 24)

const seriesData = [{
  start: Date.UTC(2017, 10, 18, 8),
  end: Date.UTC(2017, 10, 25, 16),
  name: 'Start prototype',
  assignee: 'Richards',
  y: 0
}, {
  start: Date.UTC(2017, 10, 20, 8),
  end: Date.UTC(2017, 10, 24, 16),
  name: 'Develop',
  assignee: 'Michaels',
  y: 1
}, {
  start: Date.UTC(2017, 10, 25, 16),
  end: Date.UTC(2017, 10, 25, 16),
  name: 'Prototype done',
  assignee: 'Richards',
  y: 2
}, {
  start: Date.UTC(2017, 10, 27, 8),
  end: Date.UTC(2017, 11, 3, 16),
  name: 'Test prototype',
  assignee: 'Richards',
  y: 3
}, {
  start: Date.UTC(2017, 10, 23, 8),
  end: Date.UTC(2017, 11, 15, 16),
  name: 'Run acceptance tests',
  assignee: 'Halliburton',
  y: 4
}]

class App extends Component {

  render () {
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Left Axis as Table</Title>
          <XAxis tickPixelInterval={70} />
          <YAxis type="category" categories={seriesData.map(s => s.name)} visible={false}>
            <GridColumn categories={seriesData.map(s => dateFormat('%e. %b', s.end))}>
              <GridColumn.Title>End date</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={seriesData.map(s => dateFormat('%e. %b', s.start))}>
              <GridColumn.Title>Start date</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={seriesData.map(s => (s.end - s.start) / days).map(d =>  Math.round(d * 100) / 100)}>
              <GridColumn.Title>Est. days</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={seriesData.map(s => s.assignee)}>
              <GridColumn.Title>Assignee</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={seriesData.map(s => s.name)}>
              <GridColumn.Title>Project</GridColumn.Title>
            </GridColumn>

            <GanttSeries name="Project 1" data={seriesData} />
          </YAxis>
          <Tooltip xDateFormat="%e %b %Y, %H:%M" />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
