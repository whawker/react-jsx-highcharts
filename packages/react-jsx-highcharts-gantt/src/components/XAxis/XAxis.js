import React from 'react';
import { XAxis } from 'react-jsx-highcharts';

const GanttXAxis = ({ ...props }) => (
  <XAxis {...props} id="xAxis" dynamicAxis={false} type={"datetime"}/>
);

GanttXAxis.defaultProps = {
  grid: { enabled: true },
  opposite: true,
  uniqueNames: true
};

export default GanttXAxis;
