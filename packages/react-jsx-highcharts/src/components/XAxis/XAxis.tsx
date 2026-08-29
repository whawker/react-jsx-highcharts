import * as React from 'react';
import Axis from '../Axis';
import useChart from '../UseChart';

import type { XAxisProps } from '../Axis/Axis';

const XAxis = ({ id, ...rest }: Omit<XAxisProps, 'isX'>) => {
  const chart = useChart();

  const isStockChart = chart.type === 'stockChart';
  const type = isStockChart ? 'datetime' : 'linear';
  const axisId = isStockChart ? 'xAxis' : id;

  return <Axis type={type} {...rest} id={axisId} isX />;
};

export default XAxis;
