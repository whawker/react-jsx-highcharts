import React, { Component } from 'react'
import Highcharts from 'highcharts/highcharts-gantt'
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
} from 'react-jsx-highcharts-gantt'
import ExampleCode from '../utils/ExampleCode'
import code from './exampleCode'

var today = new Date(),
  day = 1000 * 60 * 60 * 24,
  // Utility functions
  dateFormat = Highcharts.dateFormat,
  defined = Highcharts.defined,
  isObject = Highcharts.isObject,
  reduce = Highcharts.reduce

// Set to 00:00:00:000 today
today.setUTCHours(0)
today.setUTCMinutes(0)
today.setUTCSeconds(0)
today.setUTCMilliseconds(0)
today = today.getTime()

const pointFormatter = function () {
  var point = this,
    format = '%e. %b',
    options = point.options,
    completed = options.completed,
    amount = isObject(completed) ? completed.amount : completed,
    status = ((amount || 0) * 100) + '%',
    lines

  lines = [{
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
  }]

  return reduce(lines, function (str, line) {
    var s = '',
      style = (
        defined(line.style) ? line.style : 'font-size: 0.8em;'
      )
    if (line.visible !== false) {
      s = (
        '<span style="' + style + '">' +
        (defined(line.title) ? line.title + ': ' : '') +
        (defined(line.value) ? line.value : '') +
        '</span><br/>'
      )
    }
    return str + s
  }, '')
}

const seriesData = [
  {
    name: 'Offices',
    data: [{
      name: 'New offices',
      id: 'new_offices',
      owner: 'Peter',
      y: 0
    }, {
      name: 'Prepare office building',
      id: 'prepare_building',
      parent: 'new_offices',
      start: today - (2 * day),
      end: today + (6 * day),
      completed: {
        amount: 0.2
      },
      owner: 'Linda',
      y: 1
    }, {
      name: 'Inspect building',
      id: 'inspect_building',
      dependency: 'prepare_building',
      parent: 'new_offices',
      start: today + 6 * day,
      end: today + 8 * day,
      owner: 'Ivy',
      y: 2
    }, {
      name: 'Passed inspection',
      id: 'passed_inspection',
      dependency: 'inspect_building',
      parent: 'new_offices',
      start: today + 9.5 * day,
      milestone: true,
      owner: 'Peter',
      y: 3
    }, {
      name: 'Relocate',
      id: 'relocate',
      dependency: 'passed_inspection',
      parent: 'new_offices',
      owner: 'Josh',
      y: 4
    }, {
      name: 'Relocate staff',
      id: 'relocate_staff',
      parent: 'relocate',
      start: today + 10 * day,
      end: today + 11 * day,
      owner: 'Mark',
      y: 5
    }, {
      name: 'Relocate test facility',
      dependency: 'relocate_staff',
      parent: 'relocate',
      start: today + 11 * day,
      end: today + 13 * day,
      owner: 'Anne',
      y: 6
    }, {
      name: 'Relocate cantina',
      dependency: 'relocate_staff',
      parent: 'relocate',
      start: today + 11 * day,
      end: today + 14 * day,
      y: 7
    }]
  },
  {
    name: 'Product',
    data: [{
      name: 'New product launch',
      id: 'new_product',
      owner: 'Peter',
      y: 8
    }, {
      name: 'Development',
      id: 'development',
      parent: 'new_product',
      start: today - day,
      end: today + (11 * day),
      completed: {
        amount: 0.6,
        fill: '#e80'
      },
      owner: 'Susan',
      y: 9
    }, {
      name: 'Beta',
      id: 'beta',
      dependency: 'development',
      parent: 'new_product',
      start: today + 12.5 * day,
      milestone: true,
      owner: 'Peter',
      y: 10
    }, {
      name: 'Final development',
      id: 'finalize',
      dependency: 'beta',
      parent: 'new_product',
      start: today + 13 * day,
      end: today + 17 * day,
      y: 11
    }, {
      name: 'Launch',
      dependency: 'finalize',
      parent: 'new_product',
      start: today + 17.5 * day,
      milestone: true,
      owner: 'Peter',
      y: 12
    }]
  }
]

class App extends Component {
  render () {
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Gantt Project Management</Title>
          <XAxis
            currentDateIndicator
            min={today - 3 * day}
            max={today + 18 * day}
          />
          <YAxis type='treegrid' categories={[].concat(...seriesData.map(s => s.data.map(p => p.name)))}>
            {seriesData.map(s => (
              <GanttSeries key={s.name} name={s.name} data={s.data} />
            ))}
          </YAxis>
          <Tooltip pointFormatter={pointFormatter} />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    )
  }
}

export default withHighcharts(App, Highcharts)
