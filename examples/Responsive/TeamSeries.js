import React from 'react';
import { SplineSeries } from 'react-jsx-highcharts';

const TeamSeries = ({ name, color, matchWeek, onClick, ...rest }) => (
  <SplineSeries
    name={name}
    color={color}
    zoneAxis="x"
    zones={[
      { value: matchWeek, color },
      { color: '#ddd', dashStyle: 'ShortDot' }
    ]}
    onClick={() => onClick(name)}
    {...rest} />
);

export default TeamSeries;