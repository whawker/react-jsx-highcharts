export default `
const pieData = [{
  name: 'Jane',
  y: 13
}, {
  name: 'John',
  y: 23
}, {
  name: 'Joe',
  y: 19
}];

return (
  <HighchartsChart>
    <Chart />

    <Title>Combination chart</Title>

    <Legend />

    <XAxis id="x" categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

    <YAxis id="number">
      <ColumnSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
      <ColumnSeries id="john" name="John" data={[2, 3, 5, 7, 6]} />
      <ColumnSeries id="joe" name="Joe" data={[4, 3, 3, 9, 0]} />
      <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
      <PieSeries id="total-consumption" name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
    </YAxis>
  </HighchartsChart>
);

// Remember to inject Highcharts to component
export default withHighcharts(MyComponent, Highcharts);`;
