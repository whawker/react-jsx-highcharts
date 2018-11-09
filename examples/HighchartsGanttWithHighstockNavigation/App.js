import React, {Component} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import {
  GanttSeries,
  HighchartsGanttChart,
  Subtitle,
  Title,
  withHighcharts,
  YAxis
} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import {Scrollbar, RangeSelector, Navigator} from 'react-jsx-highstock';


class App extends Component {

  render() {


    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Gantt Chart with Highstock Navigation</Title>
          <YAxis
            uniqueNames
          />
          <Navigator>
            <Navigator.Series
              type={"gantt"}
              pointPlacement={0.5}
              pointPadding={0.25}
            />
            <Navigator.YAxis min={0} max={3} reversed categories={[]}/>
          </Navigator>
          <Scrollbar/>
          <RangeSelector
            enabled
            selected={0}
          />
          <GanttSeries
            name={"Project 1"}
            data={
              [{
                start: Date.UTC(2017, 11, 1),
                end: Date.UTC(2018, 1, 2),
                completed: 0.95,
                name: 'Prototyping'
              }, {
                start: Date.UTC(2018, 1, 2),
                end: Date.UTC(2018, 11, 5),
                completed: 0.5,
                name: 'Development'
              }, {
                start: Date.UTC(2018, 11, 8),
                end: Date.UTC(2018, 11, 9),
                completed: 0.15,
                name: 'Testing'
              }, {
                start: Date.UTC(2018, 11, 9),
                end: Date.UTC(2018, 11, 19),
                completed: {
                  amount: 0.3,
                  fill: '#fa0'
                },
                name: 'Development'
              }, {
                start: Date.UTC(2018, 11, 10),
                end: Date.UTC(2018, 11, 23),
                name: 'Testing'
              }, {
                start: Date.UTC(2018, 11, 25, 8),
                end: Date.UTC(2018, 11, 25, 16),
                name: 'Release'
              }]
            }
          />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
