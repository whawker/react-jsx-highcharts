import React from 'react';
import { PlotBand } from 'react-jsx-highcharts';

const LeagueTableSection = ({ pos, size = 1, opacity, children }) => (
  <PlotBand from={pos - 0.5} to={pos + size - 0.5} color={`rgba(0,0,0,${opacity})`}>
    <PlotBand.Label align="center" style={{color: "#aaa"}}>{children}</PlotBand.Label>
  </PlotBand>
)

export default LeagueTableSection;