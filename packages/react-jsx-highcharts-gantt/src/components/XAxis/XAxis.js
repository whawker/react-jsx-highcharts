import React from 'react';
import { XAxis } from 'react-jsx-highcharts';

const GanttXAxis = ({ ...props }) => (
  <XAxis {...props} id="xAxis" dynamicAxis={false} />
);

GanttXAxis.defaultProps = {
  endOnTick: false,
  visible: false,
  minPadding: 0,
  maxPadding: 0,
  startOnTick: false
};

export default GanttXAxis;
