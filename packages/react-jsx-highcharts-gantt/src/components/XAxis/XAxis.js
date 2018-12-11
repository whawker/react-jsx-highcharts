import React from 'react';
import { XAxis } from 'react-jsx-highcharts';

const GanttXAxis = props => (
  <XAxis {...props} id="xAxis" dynamicAxis={false} type="datetime"/>
);

GanttXAxis.defaultProps = {
  grid: { enabled: true },
  opposite: true,
  uniqueNames: true
};

GanttXAxis.Title = XAxis.Title

export default GanttXAxis;
