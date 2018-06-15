import React from 'react';
import { XAxis } from 'react-jsx-highcharts';

const MapXAxis = ({ ...props }) => (
  <XAxis {...props} />
);

MapXAxis.defaultProps = {
  endOnTick: false,
  visible: false,
  minPadding: 0,
  maxPadding: 0,
  startOnTick: false
};

export default MapXAxis;
