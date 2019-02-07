export default `
const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Left Axis as Table</Title>
 
      <XAxis tickPixelInterval={70} />
 
      <YAxis type="category" visible={false}>
        <GridColumn categories={seriesData.map(s => dateFormat('%e. %b', s.end))}>
          <GridColumn.Title>End date</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={seriesData.map(s => dateFormat('%e. %b', s.start))}>
          <GridColumn.Title>Start date</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={seriesData.map(s => (s.end - s.start) / day).map(d =>  Math.round(d * 100) / 100)}>
          <GridColumn.Title>Est. days</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={map(seriesData, 'assignee')}>
          <GridColumn.Title>Assignee</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={map(seriesData, 'name')}>
          <GridColumn.Title>Project</GridColumn.Title>
        </GridColumn>

        <GanttSeries name="Project 1" data={seriesData} />
      </YAxis>

      <Tooltip xDateFormat="%e %b %Y, %H:%M" />
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
