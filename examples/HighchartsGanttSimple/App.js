import React, {Component} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import {HighchartsGanttChart, Subtitle, Title, GanttSeries, withHighcharts} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';


class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Simple Highcharts Gantt</Title>
          <GanttSeries
            name={"Project 1"}
            data={
              [{
                id: 's',
                name: 'Start prototype',
                start: Date.UTC(2014, 10, 18),
                end: Date.UTC(2014, 10, 20)
              }, {
                id: 'b',
                name: 'Develop',
                start: Date.UTC(2014, 10, 20),
                end: Date.UTC(2014, 10, 25),
                dependency: 's'
              }, {
                id: 'a',
                name: 'Run acceptance tests',
                start: Date.UTC(2014, 10, 23),
                end: Date.UTC(2014, 10, 26)
              }, {
                name: 'Test prototype',
                start: Date.UTC(2014, 10, 27),
                end: Date.UTC(2014, 10, 29),
                dependency: ['a', 'b']
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
