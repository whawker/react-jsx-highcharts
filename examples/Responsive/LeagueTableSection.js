import React from 'react';
import { PlotBand } from 'react-jsx-highcharts';

const LABEL_STYLE = {color: "#aaa"};

const LeagueTableSection = ({ pos, size = 1, opacity, children }) => (
  <PlotBand from={pos - 0.5} to={pos + size - 0.5} color={`rgba(0,0,0,${opacity})`}>
    <PlotBand.Label align="center" style={LABEL_STYLE}>{children}</PlotBand.Label>
  </PlotBand>
)

export default LeagueTableSection;
