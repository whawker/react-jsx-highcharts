export default `
renderTableRow (pkgName) {
  const { weekTotals, weekDownloads, monthTotals, monthDownloads } = this.state;

  return (
    <tr key={pkgName}>
      <td><code>{pkgName}</code></td>
      <td>{weekTotals[pkgName]}</td>
      <td>{this.renderSparklineDefault('Downloads', weekDownloads[pkgName])}</td>
      <td>{monthTotals[pkgName]}</td>
      <td>{this.renderSparklineWithTooltip('Downloads', monthDownloads[pkgName])}</td>
    </tr>
  );
}

renderSparklineDefault (pkgName, data) {
  return (
    <HighchartsSparkline>
      <AreaSeries data={data} />
    </HighchartsSparkline>
  );
}

renderSparklineWithTooltip (name, data) {
  const positioner = (w, h, point) => ({ x: point.plotX - w / 2, y: point.plotY - h });

  return (
    <HighchartsSparkline
      series={
        <AreaSeries name={name} data={data} color="#C12127" />
      }>
      <Tooltip
        useHTML
        borderWidth={1}
        shadow={false}
        hideDelay={0}
        padding={8}
        headerFormat={\`<b>\${name}:</b> \`}
        pointFormat={'{point.y:,.0f}'}
        positioner={positioner} />
    </HighchartsSparkline>
  );
}

render() {
  const { npmPackages, weekTotals, weekDownloads, monthTotals, monthDownloads } = this.state;
  if (!weekTotals || !weekDownloads || !monthTotals || !monthDownloads) return null;

  return (
    <div className="app">
      <h1 className="text-center">Sparkline Demo</h1>
      <p className="text-center">Download stats of selected NPM packages</p>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>NPM Package</th>
            <th>7 Day Total</th>
            <th>7 Day Sparkline</th>
            <th>30 Day Total</th>
            <th>
              30 Day Sparkline <small>(w/ tooltip)</small>
            </th>
          </tr>
        </thead>
        <tbody>
          {npmPackages.map(this.renderTableRow)}
        </tbody>
      </table>
    </div>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
