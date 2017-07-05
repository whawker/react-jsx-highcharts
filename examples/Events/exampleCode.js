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

  <YAxis id="scatter">
    <YAxis.Title>Y Coord</YAxis.Title>
    <ScatterSeries id="my-clicks" name="My clicks" data={myClicks} />
    <ScatterSeries id="user-clicks" name="Your clicks" data={userClicks} onHide={this.handleHide} onShow={this.handleShow} />
  </YAxis>
</HighchartsChart>`;
