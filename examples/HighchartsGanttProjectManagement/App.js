import React from 'react';
import startOfToday from 'date-fns/start_of_today';
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

const today = startOfToday().getTime();
const day = 24 * 60 * 60 * 1000;

const pointFormatter = function () {
  const point = this;
  const format = '%e. %b';
  const options = point.options;
  const completed = options.completed;
  const amount = typeof completed === 'object' ? completed.amount : completed;
  const status = ((amount || 0) * 100) + '%';
  const lines = [
    {
      value: point.name,
      style: 'font-weight: bold;'
    }, {
      title: 'Start',
      value: dateFormat(format, point.start)
    }, {
      visible: !options.milestone,
      title: 'End',
      value: dateFormat(format, point.end)
    }, {
      title: 'Completed',
      value: status
    }, {
      title: 'Owner',
      value: options.owner || 'unassigned'
    }
  ];

  return lines.reduce((str, {style = 'font-size: 0.8rem;', visible = false, title = '', value = ''}) => {
    let s = '';
    if (visible !== false) {
      s = `<span style="${style}">${title ? `${title}: ${value}` : value}</span><br />`
    }
    return str + s
  }, '')
}

const seriesData = [
  {
    name: 'Offices',
    data: [
      {
        name: 'New offices',
        id: 'new_offices',
        owner: 'Peter'
      },
      {
        name: 'Prepare office building',
        id: 'prepare_building',
        parent: 'new_offices',
        start: today - (2 * day),
        end: today + (6 * day),
        completed: {
          amount: 0.2
        },
        owner: 'Linda'
      },
      {
        name: 'Inspect building',
        id: 'inspect_building',
        dependency: 'prepare_building',
        parent: 'new_offices',
        start: today + 6 * day,
        end: today + 8 * day,
        owner: 'Ivy'
      },
      {
        name: 'Passed inspection',
        id: 'passed_inspection',
        dependency: 'inspect_building',
        parent: 'new_offices',
        start: today + 9.5 * day,
        milestone: true,
        owner: 'Peter'
      },
      {
        name: 'Relocate',
        id: 'relocate',
        dependency: 'passed_inspection',
        parent: 'new_offices',
        owner: 'Josh'
      },
      {
        name: 'Relocate staff',
        id: 'relocate_staff',
        parent: 'relocate',
        start: today + 10 * day,
        end: today + 11 * day,
        owner: 'Mark'
      },
      {
        name: 'Relocate test facility',
        dependency: 'relocate_staff',
        parent: 'relocate',
        start: today + 11 * day,
        end: today + 13 * day,
        owner: 'Anne'
      },
      {
        name: 'Relocate cantina',
        dependency: 'relocate_staff',
        parent: 'relocate',
        start: today + 11 * day,
        end: today + 14 * day
      }
    ]
  },
  {
    name: 'Product',
    data: [
      {
        name: 'New product launch',
        id: 'new_product',
        owner: 'Peter'
      },
      {
        name: 'Development',
        id: 'development',
        parent: 'new_product',
        start: today - day,
        end: today + (11 * day),
        completed: {
          amount: 0.6,
          fill: '#e80'
        },
        owner: 'Susan'
      },
      {
        name: 'Beta',
        id: 'beta',
        dependency: 'development',
        parent: 'new_product',
        start: today + 12.5 * day,
        milestone: true,
        owner: 'Peter'
      },
      {
        name: 'Final development',
        id: 'finalize',
        dependency: 'beta',
        parent: 'new_product',
        start: today + 13 * day,
        end: today + 17 * day
      },
      {
        name: 'Launch',
        dependency: 'finalize',
        parent: 'new_product',
        start: today + 17.5 * day,
        milestone: true,
        owner: 'Peter'
      }
    ]
  }
];

const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Gantt Project Management</Title>

      <XAxis
        currentDateIndicator
        min={today - 3 * day}
        max={today + 18 * day}
      />

      <YAxis type='treegrid'>
        {seriesData.map(({ name, data }) => (
          <GanttSeries key={name} name={name} data={data}/>
        ))}
      </YAxis>

      <Tooltip pointFormatter={pointFormatter}/>
    </HighchartsGanttChart>

    <ExampleCode name="Gantt">{code}</ExampleCode>
  </div>
);

export default withHighcharts(App, Highcharts);
