export default `
updateLiveData () {
  const { data1, data2 } = this.state;

  this.setState({
    data1: addDataPoint(data1),
    data2: addDataPoint(data2)
  });
}

handleStartLiveUpdate (e) {
  e && e.preventDefault();
  this.setState({
    liveUpdate: window.setInterval(this.updateLiveData, 1000)
  });
}

render () {
  const { data1, data2 } = this.state;

  return (
    <HighchartsChart>
      <Chart />

      <Title>Dynamically updating data</Title>

      <Legend>
        <Legend.Title>Legend</Legend.Title>
      </Legend>

      <XAxis type="datetime">
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Pressure (m)</YAxis.Title>
        <LineSeries name="Sensor 1" data={data1} />
        <LineSeries name="Sensor 2" data={data2} />
      </YAxis>
    </HighchartsChart>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
