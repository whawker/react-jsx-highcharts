import React, {Component} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import {GanttSeries, HighchartsGanttChart, Subtitle, Title, withHighcharts, YAxis} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';


class App extends Component {

  render() {

    return (
      <div className="app">
        <HighchartsGanttChart
          plotOptions={{
            series: {
              grouping: true
            }
          }}
        >
          <Title>Highcharts Gantt - Categorised Y-axis with grouping</Title>
          <YAxis
            type={"category"}
          />
          <GanttSeries
            data={
              [
                {
                  start: 2,
                  end: 3,
                  y: 0,
                  color: 'yellow'
                },
                {
                  start: 1,
                  end: 4,
                  y: 1,
                  color: 'red'
                },
                {
                  start: 2,
                  end: 3,
                  y: 2,
                  color: 'green'
                }
              ]
            }
          />
          <GanttSeries
            data={
              [
                {
                  start: 1,
                  end: 4,
                  y: 0,
                  color: 'blue'
                },
                {
                  start: 1,
                  end: 5,
                  y: 1,
                  color: "pink"
                },
                {
                  start: 1,
                  end: 2,
                  y: 2,
                  color: "orange"
                }
              ]
            }
          />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
