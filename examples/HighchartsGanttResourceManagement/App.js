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

// Set to 00:00:00:000 today
let today = new Date();
const day = 1000 * 60 * 60 * 24;

// Set to 00:00:00:000 today
today.setUTCHours(0);
today.setUTCMinutes(0);
today.setUTCSeconds(0);
today.setUTCMilliseconds(0);
today = today.getTime();

const cars = [{
  model: 'Nissan Leaf',
  current: 0,
  deals: [{
    rentedTo: 'Lisa Star',
    from: today - 1 * day,
    to: today + 2 * day
  }, {
    rentedTo: 'Shane Long',
    from: today - 3 * day,
    to: today - 2 * day
  }, {
    rentedTo: 'Jack Coleman',
    from: today + 5 * day,
    to: today + 6 * day
  }]
}, {
  model: 'Jaguar E-type',
  current: 0,
  deals: [{
    rentedTo: 'Martin Hammond',
    from: today - 2 * day,
    to: today + 1 * day
  }, {
    rentedTo: 'Linda Jackson',
    from: today - 2 * day,
    to: today + 1 * day
  }, {
    rentedTo: 'Robert Sailor',
    from: today + 2 * day,
    to: today + 6 * day
  }]
}, {
  model: 'Volvo V60',
  current: 0,
  deals: [{
    rentedTo: 'Mona Ricci',
    from: today + 0 * day,
    to: today + 3 * day
  }, {
    rentedTo: 'Jane Dockerman',
    from: today + 3 * day,
    to: today + 4 * day
  }, {
    rentedTo: 'Bob Shurro',
    from: today + 6 * day,
    to: today + 8 * day
  }]
}, {
  model: 'Volkswagen Golf',
  current: 0,
  deals: [{
    rentedTo: 'Hailie Marshall',
    from: today - 1 * day,
    to: today + 1 * day
  }, {
    rentedTo: 'Morgan Nicholson',
    from: today - 3 * day,
    to: today - 2 * day
  }, {
    rentedTo: 'William Harriet',
    from: today + 2 * day,
    to: today + 3 * day
  }]
}, {
  model: 'Peugeot 208',
  current: 0,
  deals: [{
    rentedTo: 'Harry Peterson',
    from: today - 1 * day,
    to: today + 2 * day
  }, {
    rentedTo: 'Emma Wilson',
    from: today + 3 * day,
    to: today + 4 * day
  }, {
    rentedTo: 'Ron Donald',
    from: today + 5 * day,
    to: today + 6 * day
  }]
}];

// Parse car data into series.
const series = cars.map(function (car, i) {
  const data = car.deals.map(function (deal, j) {
    return {
      id: `deal-${i}${j}`,
      rentedTo: deal.rentedTo,
      start: deal.from,
      end: deal.to,
      y: i,
      parent: j > 0 ? `deal-${i}${j-1}` : undefined
    };
  });
  return {
    name: car.model,
    data: data,
    current: car.deals[car.current]
  };
});

const pointFormat = '<span>Rented To: {point.rentedTo}</span><br/><span>From: {point.start:%e. %b}</span><br/><span>To: {point.end:%e. %b}</span>';

class App extends Component {

  render () {


    console.log('series', JSON.parse(JSON.stringify(series)), series)

    // TODO: Table to the left is not rendered correctly
    return (
      <div className="app">
        <HighchartsGanttChart>
          <Title>Car Rental Schedule</Title>

          <XAxis currentDateIndicator />

          <YAxis type="category" categories={series.map(s => s.name)} visible={false}>

            <GridColumn categories={series.map(s => dateFormat('%e. %b', s.current.to))}>
              <GridColumn.Title>To</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={series.map(s => dateFormat('%e. %b', s.current.from))}>
              <GridColumn.Title>From</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={series.map(s => s.current.rentedTo)}>
              <GridColumn.Title>Rented To</GridColumn.Title>
            </GridColumn>

            <GridColumn categories={series.map(s => s.name)}>
              <GridColumn.Title>Model</GridColumn.Title>
            </GridColumn>

            {series.map(s => (
              <GanttSeries
                key={s.name}
                {...s}
              />
            ))}
          </YAxis>

          <Tooltip pointFormat={pointFormat} />
        </HighchartsGanttChart>

        <ExampleCode name="Gantt">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
