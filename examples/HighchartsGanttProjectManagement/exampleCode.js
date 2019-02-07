export default `
const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Gantt Project Management</Title>

      <XAxis
        currentDateIndicator
        min={today - 3 * day}
        max={today + 18 * day}
      />

      <YAxis type='treegrid'>
        {seriesData.map(({ name, data }) => (
          <GanttSeries key={name} name={name} data={data}/>
        ))}
      </YAxis>

      <Tooltip pointFormatter={pointFormatter}/>
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
