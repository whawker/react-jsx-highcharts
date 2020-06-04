import * as React from 'react';
import { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  Tooltip
} from 'react-jsx-highcharts';
import MediaQuery from 'react-responsive';
import range from 'lodash/range';
import map from 'lodash/map';
import LeagueTableSection from './LeagueTableSection';
import TeamSeries from './TeamSeries';
import { getOrdinal, teamData } from './data';

const matchWeeks = range(39).map(String);

const plotOptions = {
  series: {
    cursor: 'pointer',
    linecap: 'square',
    marker: {
      enabled: false,
      states: {
        hover: { enabled: false }
      }
    }
  }
};

const pointFormatter = function() {
  return `<strong>Match Week ${this.x}</strong><br />${
    this.series.name
  }: ${getOrdinal(this.y)}`;
};

const labelFormatter = {
  formatter: function() {
    if (this.value === 0) return '';
    return this.value;
  }
};

class LeagueTableChart extends Component {
  state = {
    active: null
  };

  handleClick = name => {
    this.setState(prevState => ({
      active: prevState.active === name ? null : name
    }));
  };

  renderTeamSeries = ({ color, data }, name) => {
    const { matchWeek } = this.props;
    const { active } = this.state;

    return (
      <TeamSeries
        key={name}
        name={name}
        color={!active || active === name ? color : '#ddd'}
        data={data}
        matchWeek={matchWeek}
        onClick={this.handleClick}
      />
    );
  };

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

        <YAxis
          reversed
          min={0.5}
          max={20.5}
          tickInterval={1}
          endOnTick={false}
          labels={labelFormatter}
          gridLineWidth={0}
        >
          <YAxis.Title>League Position</YAxis.Title>

          <LeagueTableSection pos={1} opacity="0.1">
            Champions
          </LeagueTableSection>
          <LeagueTableSection pos={2} size={3} opacity="0.05">
            Champions League
          </LeagueTableSection>
          <LeagueTableSection pos={5} opacity="0.025">
            Europa League
          </LeagueTableSection>
          <LeagueTableSection pos={18} size={3} opacity="0.05">
            Relegated
          </LeagueTableSection>

          {map(teamData, this.renderTeamSeries)}
        </YAxis>
      </HighchartsChart>
    );
  }
}

export default withHighcharts(LeagueTableChart, Highcharts);
