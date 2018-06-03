export default `
class LeagueTableChart extends Component {

  state = {
    active: null
  };

  handleClick = name => {
    this.setState(prevState => ({
      active: (prevState.active === name) ? null : name
    }));
  }

  renderTeamSeries = ({ color, data }, name) => {
    const { matchWeek } = this.props;
    const { active } = this.state;

    return (
      <TeamSeries
        key={name}
        name={name}
        color={(!active || active === name) ? color : '#ddd'}
        data={data}
        matchWeek={matchWeek}
        onClick={this.handleClick} />
    );
  }

  render() {
    return (
      <HighchartsChart plotOptions={plotOptions} className="league-table-chart">
        <Chart height={600} backgroundColor="transparent" />

        <Title>Premier League 17-18: League Positions by Match Week</Title>

        <Subtitle>Using react-responsive (Hides Legend)</Subtitle>

        <MediaQuery minWidth={767}>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </MediaQuery>

        <Tooltip formatter={pointFormatter} />

        <XAxis tickInterval={1} categories={matchWeeks}>
          <XAxis.Title>Match Week</XAxis.Title>
        </XAxis>

        <YAxis reversed min={0.5} max={20.5} tickInterval={1} endOnTick={false} labels={{ formatter: labelFormatter }} gridLineWidth={0}>
          <YAxis.Title>League Position</YAxis.Title>

          <LeagueTableSection pos={1} opacity="0.1">Champions</LeagueTableSection>
          <LeagueTableSection pos={2} size={3} opacity="0.05">Champions League</LeagueTableSection>
          <LeagueTableSection pos={5} opacity="0.025">Europa League</LeagueTableSection>
          <LeagueTableSection pos={18} size={3} opacity="0.05">Relegated</LeagueTableSection>

          {map(teamData, this.renderTeamSeries)}
        </YAxis>
      </HighchartsChart>
    );
  }
}

export default withHighcharts(LeagueTableChart, Highcharts);`