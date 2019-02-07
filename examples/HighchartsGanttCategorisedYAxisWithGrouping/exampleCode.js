export default `
const plotOptions = {
  series: {
    grouping: true
  }
}

const App = () => (
  <div className="app">
    <HighchartsGanttChart plotOptions={plotOptions}>
      <Title>Highcharts Gantt - Categorised Y-axis with grouping</Title>

      <YAxis type="category">
        <GanttSeries
          data={[
            { start: 2, end: 3, color: 'yellow' },
            { start: 1, end: 4, color: 'red' },
            { start: 2, end: 3, color: 'green' }
          ]}
        />

        <GanttSeries
          data={[
            { start: 1, end: 4, color: 'blue' },
            { start: 1, end: 5, color: 'pink' },
            { start: 1, end: 2, color: 'orange' }
          ]}
        />
      </YAxis>
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
