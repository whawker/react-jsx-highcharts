export default `
const App = () => {

  const plotOptions = {
    series: {
      label: {
        minFontSize: 5,
          maxFontSize: 15,
          style: {
          color: 'rgba(255,255,255,0.75)'
        }
      }
    }
  };

  return (
    <div className="app">
      <HighchartsChart plotOptions={plotOptions}>
        <Chart marginBottom={30} zoomType="x" />

        <Title floating align="left">Winter Olympic Medal Wins</Title>

        <Subtitle floating align="left" y={30}>Source: sports-reference.com</Subtitle>

        <XAxis type="category" categories={hosts} labels={{ align: 'left', reserveSpace: false, rotation: 270 }} lineWidth={0} tickWidth={0} margin={20} crosshair />

        <YAxis visible={false} startOnTick={false} endOnTick={false}>
          {Object.keys(data).map(country => (
            <StreamGraphSeries key={country} name={country} data={data[country].data} color={data[country].color} />
          ))}
        </YAxis>

        <Tooltip />
      </HighchartsChart>
    </div>
  );
}

export default withHighcharts(App, Highcharts);`;
