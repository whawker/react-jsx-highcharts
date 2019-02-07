export default `
const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Highcharts Gantt With Subtasks</Title>

      <XAxis min={today - (2 * day)} max={today + (32 * day)} />

      <YAxis>
        <GanttSeries name="Project 1" data={[
          {
            name: 'Planning',
            id: 'planning',
            start: today,
            end: today + (20 * day)
          },
          {
            name: 'Requirements',
            id: 'requirements',
            parent: 'planning',
            start: today,
            end: today + (5 * day)
          },
          {
            name: 'Design',
            id: 'design',
            dependency: 'requirements',
            parent: 'planning',
            start: today + (3 * day),
            end: today + (20 * day)
          },
          {
            name: 'Layout',
            id: 'layout',
            parent: 'design',
            start: today + (3 * day),
            end: today + (10 * day)
          },
          {
            name: 'Graphics',
            parent: 'design',
            dependency: 'layout',
            start: today + (10 * day),
            end: today + (20 * day)
          },
          {
            name: 'Develop',
            id: 'develop',
            start: today + (5 * day),
            end: today + (30 * day)
          },
          {
            name: 'Create unit tests',
            id: 'unit_tests',
            dependency: 'requirements',
            parent: 'develop',
            start: today + (5 * day),
            end: today + (8 * day)
          },
          {
            name: 'Implement',
            id: 'implement',
            dependency: 'unit_tests',
            parent: 'develop',
            start: today + (8 * day),
            end: today + (30 * day)
          }
        ]} />
      </YAxis>
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
