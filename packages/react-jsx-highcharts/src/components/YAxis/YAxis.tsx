import * as React from 'react';
import Axis from '../Axis/index.ts';

import type { YAxisProps } from '../Axis/Axis.tsx';

const YAxis = ({ type = 'linear', ...restProps }: Omit<YAxisProps, 'isX'>) => (
  <Axis type={type} {...restProps} isX={false} />
);

YAxis.displayName = 'YAxis';

const chartYAxis = YAxis as typeof YAxis & {
  Title: typeof Axis.Title;
};

chartYAxis.Title = Axis.Title;
export default chartYAxis;
