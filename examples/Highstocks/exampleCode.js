export default `
<HighchartsStockChart>
  <Chart zoomType="x" />

  <Title>Highstocks Example</Title>

  <Legend>
    <Legend.Title>Key</Legend.Title>
  </Legend>

  <RangeSelector>
    <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
    <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
    <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
    <RangeSelector.Button type="all">All</RangeSelector.Button>
    <RangeSelector.Input boxBorderColor="#7cb5ec" />
  </RangeSelector>

  <Tooltip />

  <XAxis>
    <XAxis.Title>Time</XAxis.Title>
  </XAxis>

  <YAxis id="price">
    <YAxis.Title>Price</YAxis.Title>
    <AreaSplineSeries id="profit" name="Profit" data={data1} />
  </YAxis>

  <YAxis id="social" opposite>
    <YAxis.Title>Social Buzz</YAxis.Title>
    <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
  </YAxis>

  <Navigator>
    <Navigator.Series seriesId="profit" />
    <Navigator.Series seriesId="twitter" />
  </Navigator>
</HighchartsStockChart>`;
