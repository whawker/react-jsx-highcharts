export default `
const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Simple Highcharts Gantt</Title>

      <YAxis>
        <GanttSeries name="Project 1" data={[
          {
            id: 's',
            name: 'Start prototype',
            start: Date.UTC(2014, 10, 18),
            end: Date.UTC(2014, 10, 20)
          },
          {
            id: 'b',
            name: 'Develop',
            start: Date.UTC(2014, 10, 20),
            end: Date.UTC(2014, 10, 25)
          },
          {
            id: 'a',
            name: 'Run acceptance tests',
            start: Date.UTC(2014, 10, 23),
            end: Date.UTC(2014, 10, 26)
          },
          {
            name: 'Test prototype',
            start: Date.UTC(2014, 10, 27),
            end: Date.UTC(2014, 10, 29),
            dependency: ['a', 'b']
          }
        ]} />
      </YAxis>
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
