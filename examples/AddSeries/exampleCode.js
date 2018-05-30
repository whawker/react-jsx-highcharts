export default `
createRandomSeries (index) {
  return {
    name: \`Series\$\{index\}\`,
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
    <LineSeries name={name} key={name} data={data} />
  );
}

render() {
  return (
    <div className="app">

      <HighchartsChart>
        <Title>Dynamically add/remove series</Title>

        <Legend align="left">
          <Legend.Title>Legend</Legend.Title>
        </Legend>

        <XAxis type="datetime">
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>

        <YAxis>
          <YAxis.Title>Price</YAxis.Title>
          {this.state.series.map(this.renderSeries)}
        </YAxis>
      </HighchartsChart>

      <div className="btn-toolbar" role="toolbar">
        <button className="btn btn-primary" onClick={this.handleAddSeries}>Add line series</button>
        <button className="btn btn-danger" onClick={this.handleRemoveSeries}>Remove line series</button>
      </div>
    </div>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
