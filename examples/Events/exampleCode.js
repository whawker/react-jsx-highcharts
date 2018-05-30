export default `
<HighchartsChart>
  <Chart zoomType="xy" onClick={this.handleClick} />

  <Title>Click to add data</Title>

  <Legend>
    <Legend.Title>Legend</Legend.Title>
  </Legend>

  <XAxis>
    <XAxis.Title>X Coord</XAxis.Title>
  </XAxis>

  <YAxis>
    <YAxis.Title>Y Coord</YAxis.Title>
    <ScatterSeries name="My clicks" data={myClicks} />
    <ScatterSeries name="Your clicks" data={userClicks} onHide={this.handleHide} onShow={this.handleShow} />
  </YAxis>
</HighchartsChart>

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
