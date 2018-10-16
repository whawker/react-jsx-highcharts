import React from 'react';
import { YAxis } from 'react-jsx-highcharts';

const MapYAxis = ({ ...props }) => (
  <YAxis {...props} id="yAxis" dynamicAxis={false} />
);

MapYAxis.defaultProps = {
  endOnTick: false,
  visible: false,
  minPadding: 0,
  maxPadding: 0,
  startOnTick: false,
  reversed: true
};

export default MapYAxis;
