import * as React from 'react';
import Axis from '../Axis/index.ts';
import useChart from '../UseChart/index.ts';

import type { XAxisProps } from '../Axis/Axis.tsx';

const XAxis = ({ id, ...rest }: Omit<XAxisProps, 'isX'>) => {
  const chart = useChart();

  const isStockChart = chart.type === 'stockChart';
  const type = isStockChart ? 'datetime' : 'linear';
  const axisId = isStockChart ? 'xAxis' : id;

  return <Axis type={type} {...rest} id={axisId} isX />;
};

export default XAxis;
