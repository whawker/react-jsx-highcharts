import React from 'react';
import { YAxis } from 'react-jsx-highcharts';

const GanttYAxis = ({ categories, type, ...props }) => {
  const seriesType = categories ? type : 'treegrid';
  return (
    <YAxis {...props} id="yAxis" dynamicAxis={false} type={seriesType} />
  );
}

GanttYAxis.defaultProps = {
  grid: { enabled: true },
  reversed: true,
  staticScale: 50
};

export default GanttYAxis;
