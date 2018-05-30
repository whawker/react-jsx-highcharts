export default `
<div className="app">
  <Highcharts3dChart alpha={30} beta={beta} depth={300} viewDistance={0} plotOptions={plotOptions}>
    <Chart />

    <Title>3D Scatter Chart</Title>

    <Subtitle>Plotting cos(x) * cos(y) (with zones for colours)</Subtitle>

    <XAxis min={0} max={numRows} labels={{ enabled: false }} />

    <YAxis min={-2} max={2} labels={{ enabled: false }} />

    <ZAxis min={0} max={numRows} labels={{ enabled: false }}>
      <ScatterSeries data={data} zones={zones} />
    </ZAxis>
  </Highcharts3dChart>

  <div>
    <label htmlFor="beta">Beta Angle</label>
    <input id="beta" type="range" min="0" max="45" step="1" value={beta} onChange={this.handleSliderChange} />
    <span>{beta}</span>
  </div>
</div>

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
