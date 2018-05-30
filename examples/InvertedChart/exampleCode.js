export default `
render () {
  const plotOptions = {
    areaspline: {
      fillOpacity: 1,
      lineWidth: 0,
      marker: {
        enabled: false,
        states: {
          hover: { enabled: false }
        }
      }
    }
  };

  const positioner = (w, h, point) => ({x: 0, y: point.plotY + (h / 2) + 8});
    
  const { seasons, totalGoals, avgGoalsPerGame } = this.state; 

  return (
    <div className="app">
      <HighchartsChart plotOptions={plotOptions}>
        <Chart inverted marginLeft={300} height={650} />

        <Title>Premier League Goal Stats: 1992-93 to 2016-17</Title>

        <Subtitle>Source: myfootballfacts.com</Subtitle>

        <XAxis type="category" categories={seasons} crosshair={{ zIndex: 10 }} lineWidth={0} tickLength={0}>
          <XAxis.Title>Season</XAxis.Title>
        </XAxis>

        <YAxis min={800} gridLineWidth={0} labels={{ enabled: false }}>
          <AreaSplineSeries name="Total Goals" data={totalGoals} color="#38003c" />
        </YAxis>

        <YAxis min={2.4} max={7} gridLineWidth={0} labels={{ enabled: false }}>
          <AreaSplineSeries name="Average Goals per Game" data={avgGoalsPerGame} color="#e90052" />
        </YAxis>

        <Tooltip shared positioner={positioner} backgroundColor="transparent" borderWidth={0} shadow={false} />
      </HighchartsChart>
    </div>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
