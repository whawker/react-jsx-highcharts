export default `
renderPlotBand (band, index) {
  const { from, to } = band;
  const id = \`\${from}-\${to}\`;
  const color = (index % 2) ? '#FFFFFF' : 'rgba(68, 170, 213, 0.1)';
  return (
    <PlotBand key={id} from={from} to={to} color={color}>
      <PlotBand.Label>{band.label}</PlotBand.Label>
    </PlotBand>
  );
}

render() {
  const plotOptions =  {
    spline: {
      lineWidth: 4,
        states: {
        hover: {
          lineWidth: 5
        }
      },
      marker: {
        enabled: false
      },
      pointInterval: 3600000, // one hour
      pointStart: Date.UTC(2015, 4, 31, 0, 0, 0)
    }
  };

  const bands = [
    { label: 'Light air', from: 0.5, to: 1.5 },
    { label: 'Light breeze', from: 1.5, to: 3.3 },
    { label: 'Gentle breeze', from: 3.3, to: 5.5 },
    { label: 'Moderate breeze', from: 5.5, to: 8 },
    { label: 'Fresh breeze', from: 8, to: 11 },
    { label: 'Strong breeze', from: 11, to: 14 },
    { label: 'High wind', from: 14, to: 15 }
  ];

  return (
    <HighchartsChart plotOptions={plotOptions}>
      <Chart type="spline" />

      <Title>Wind speed during two days</Title>

      <Subtitle>May 31 and and June 1, 2015 at two locations in Vik i Sogn, Norway</Subtitle>

      <Legend />

      <Tooltip valueSuffix=" m/s" />

      <XAxis type="datetime">
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis minorGridLineWidth={0} gridLineWidth={0} alternateGridColor={null}>
        <YAxis.Title>Wind speed (m/s)</YAxis.Title>
        <SplineSeries name="Hestavollane" data={[0.2, 0.8, 0.8, 0.8, 1, 1.3, // etc.]} />
        <SplineSeries name="Vix" data={[0, 0, 0.6, 0.9, 0.8, 0.2, 0, 0, 0, 0.1, 0.6, // etc.]} />
        {bands.map(this.renderPlotBand)}
      </YAxis>
    </HighchartsChart>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
