import React, { Component } from 'react';
import {
  HighchartsStockChart, Chart, XAxis, YAxis, Title, AreaSplineSeries, FlagSeries, Navigator, PlotBand
} from 'react-jsx-highstock';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { createRandomData } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);

    this.renderPlotBand = this.renderPlotBand.bind(this);
    this.renderNavPlotBand = this.renderNavPlotBand.bind(this);

    const now = Date.now();
    const unitSales = createRandomData(now, 1e8);
    this.state = {
      unitSales,
      campaigns: [
        {
          from: unitSales[9][0],
          to: unitSales[23][0],
          title: 'US TV advert campaign'
        },
        {
          from: unitSales[50][0],
          to: unitSales[57][0],
          title: 'UK Radio advert campaign'
        }
      ],
      notableEvents: [
        {
          x: unitSales[0][0],
          title: 'North American Launch Date'
        },
        {
          x: unitSales[30][0],
          title: 'European Launch Date'
        },
        {
          x: unitSales[85][0],
          title: 'Asian Launch Date'
        }
      ]
    };
  }

  renderPlotBand ({ from, to, title }) {
    const id = `band-${from}-${to}`;
    return (
      <PlotBand id={id} key={id} from={from} to={to} color="rgba(68, 170, 213, 0.3)">
        <PlotBand.Label>{title}</PlotBand.Label>
      </PlotBand>
    );
  }

  renderNavPlotBand ({ from, to }) {
    const id = `nav-band-${from}-${to}`;
    return (
      <PlotBand id={id} key={id} from={from} to={to} color="rgba(68, 170, 213, 0.3)" />
    );
  }

  render () {
    const { unitSales, notableEvents, campaigns } = this.state;

    return (
      <div className="app">
        <HighchartsStockChart>
          <Chart zoomType="x" />

          <Title>Highstocks with Navigator Plot Bands</Title>

          <XAxis>
            <XAxis.Title>Date</XAxis.Title>
            {campaigns.map(this.renderPlotBand)}
          </XAxis>

          <YAxis id="sales">
            <YAxis.Title>Cars sold per day</YAxis.Title>
            <AreaSplineSeries id="unitSales" name="Unit Sales" data={unitSales} />
            <FlagSeries id="events" onSeries="unitSales" data={notableEvents} />
          </YAxis>

          <Navigator>
            <Navigator.Series seriesId="unitSales" />
            <Navigator.XAxis labels={{ x: 0, y: 12 }}>
              {campaigns.map(this.renderNavPlotBand)}
            </Navigator.XAxis>
          </Navigator>
        </HighchartsStockChart>

        <ExampleCode name="HighstockPlotBands">{code}</ExampleCode>

      </div>
    );
  }
}

export default App;
