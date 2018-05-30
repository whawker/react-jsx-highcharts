export default `
renderPlotBand ({ from, to, title }) {
  const id = \`band-\${from}-\${to}\`;
  return (
    <PlotBand key={id} from={from} to={to} color="rgba(68, 170, 213, 0.3)">
      <PlotBand.Label>{title}</PlotBand.Label>
    </PlotBand>
  );
}

renderNavPlotBand ({ from, to }) {
  const id = \`nav-band-\${from}-\${to}\`;
  return (
    <PlotBand key={id} from={from} to={to} color="rgba(68, 170, 213, 0.3)" />
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

        <YAxis>
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
    </div>
  );
}

// Remember to inject Highstock to exported component
export default withHighcharts(MyComponent, Highcharts);`;
