import React, { Component } from 'react';
import {
  HighchartsChart, XAxis, YAxis, Title, Legend, LineSeries
} from '../..';
import { createRandomData } from '../utils/data-helpers';

class App extends Component {

  constructor (props) {
    super(props);
    this.createRandomSeries = this.createRandomSeries.bind(this);
    this.handleAddSeries = this.handleAddSeries.bind(this);
    this.handleRemoveSeries = this.handleRemoveSeries.bind(this);
    this.renderSeries = this.renderSeries.bind(this);
    this.renderNavSeries = this.renderNavSeries.bind(this);

    const now = Date.now();
    this.state = {
      now,
      series: [{
        name: 'Profit',
        data: createRandomData(now, 1e8)
      }],
      seriesCounter: 1
    };
  }

  createRandomSeries (index) {
    return {
      name: `Series${index}`,
      data: createRandomData(this.state.now, 1e8)
    };
  }

  handleAddSeries (e) {
    e.preventDefault();
    let { series, seriesCounter } = this.state;
    seriesCounter++;
    series.push(
      this.createRandomSeries(seriesCounter)
    );

    this.setState({
      series,
      seriesCounter
    });
  }

  handleRemoveSeries (e) {
    e.preventDefault();
    const { series } = this.state;
    const randomIndex = Math.floor(Math.random() * series.length);
    series.splice(randomIndex, 1);

    this.setState({
      series
    });
  }

  renderSeries ({ name, data }) {
    return (
      <LineSeries id={name} name={name} key={name} data={data} />
    );
  }

  renderNavSeries ({ name }) {
    return (
      <Navigator.Series seriesId={name} key={name} />
    );
  }

  render() {
    const { data1, data2 } = this.state;

    return (
      <div className="app">

        <HighchartsChart>
          <Title>Dynamically add/remove series</Title>

          <Legend>
            <Legend.Title>Legend</Legend.Title>
          </Legend>

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="price">
            <YAxis.Title>Price</YAxis.Title>
            {this.state.series.map(this.renderSeries)}
          </YAxis>
        </HighchartsChart>

        <div>
          <button className="btn btn-primary" onClick={this.handleAddSeries}>Add line series</button>
          <button className="btn btn-danger" onClick={this.handleRemoveSeries}>Remove line series</button>
        </div>
      </div>
    );
  }
}

export default App;
