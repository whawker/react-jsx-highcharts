export default `
const App = () => (
  <div className="app">
    <HighchartsGanttChart>
      <Title>Car Rental Schedule</Title>

      <XAxis currentDateIndicator />

      <YAxis type="category" categories={map(series, 'name')} visible={false}>

        <GridColumn categories={series.map(s => dateFormat('%e. %b', s.current.to))}>
          <GridColumn.Title>To</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={series.map(s => dateFormat('%e. %b', s.current.from))}>
          <GridColumn.Title>From</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={map(series, 'current.rentedTo')}>
          <GridColumn.Title>Rented To</GridColumn.Title>
        </GridColumn>

        <GridColumn categories={map(series, 'name')}>
          <GridColumn.Title>Model</GridColumn.Title>
        </GridColumn>

        {series.map(s => (
          <GanttSeries key={s.name} {...s} />
        ))}
      </YAxis>

      <Tooltip pointFormat={pointFormat} />
    </HighchartsGanttChart>
  </div>
);

export default withHighcharts(App, Highcharts);`;
