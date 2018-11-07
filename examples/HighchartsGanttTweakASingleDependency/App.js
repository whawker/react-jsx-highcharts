import React, {Component} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import {
  GanttSeries,
  HighchartsGanttChart,
  Pathfinder,
  Subtitle,
  Title,
  withHighcharts
} from 'react-jsx-highcharts-gantt';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

// Taken from an example here: https://www.highcharts.com/docs/gantt/gantt-task-dependencies
class App extends Component {

  render() {

    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Tweak a single dependency</Title>
          <Pathfinder lineColor={"black"} marker={{color: "black"}}/>
          <GanttSeries
            name={"Project 1"}
            data={
              [
                {
                  id: 'p1',
                  name: 'project 1',
                  pointWidth: 3,
                  color: 'black'
                }, {
                id: '1A',
                name: 'task A',
                start: Date.UTC(2014, 10, 18),
                end: Date.UTC(2014, 10, 20),
                parent: 'p1'
              }, {
                id: '1B',
                name: 'task B',
                start: Date.UTC(2014, 10, 20),
                end: Date.UTC(2014, 10, 25),
                dependency: '1A',
                parent: 'p1'
              }
              ]
            }
          />
          <GanttSeries
            name={"Project 2"}
            data={
              [
                {
                  id: 'p2',
                  name: 'Project 2',
                  pointWidth: 3,
                  color: 'black'
                }, {
                id: '2A',
                name: 'task A',
                start: Date.UTC(2014, 10, 23),
                end: Date.UTC(2014, 10, 26),
                parent: 'p2',
                dependency: { // set options  for a single dependency
                  to: '1B',
                  type: 'fastAvoid',
                  lineColor: 'blue',
                  startMarker: {
                    symbol: 'circle',
                    color: 'blue'
                  }
                }
              }, {
                id: '2B',
                name: 'task B',
                start: Date.UTC(2014, 10, 27),
                end: Date.UTC(2014, 10, 29),
                dependency: ['1B', '2A'],
                parent: 'p2'
              }
              ]
            }
          >
            <Pathfinder type={"fastVoid"} lineColor={"red"} dashStyle={"Dash"}/>
          </GanttSeries>
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
