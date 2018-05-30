export default `
constructor (props) {
  super(props);
  this.updateLiveData = this.updateLiveData.bind(this);
  this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);

  const now = Date.now();
  this.state = {
    data1: Immutable.List(createRandomData(now)),
    data2: Immutable.List(createRandomData(now)),
    liveUpdate: false
  };
}

updateLiveData () {
  const { data1, data2 } = this.state;

  this.setState({
    data1: data1.push(createDataPoint()),
    data2: data2.push(createDataPoint())
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

      <Title>Dynamically updating data (2)</Title>

      <Subtitle>Using Immutable.js Lists for data</Subtitle>

      <Legend>
        <Legend.Title>Legend</Legend.Title>
      </Legend>

      <XAxis type="datetime">
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Pressure (m)</YAxis.Title>
        <LineSeries name="Sensor 1" data={data1} color="#6dbcdb" />
        <LineSeries name="Sensor 2" data={data2} color="#ce424b" />
      </YAxis>
    </HighchartsChart>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
