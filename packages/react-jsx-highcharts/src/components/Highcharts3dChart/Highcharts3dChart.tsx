import * as React from 'react';
import HighchartsChart from '../HighchartsChart';
import Options3d from '../Options3d';

import type { Chart3dOptions } from 'highcharts';
import type { ReactNode } from 'react';

const CHART = {
  options3d: { enabled: true }
};
const ZAXIS = {
  id: 'zAxis'
};

type Highcharts3dChartProps = { children?: ReactNode } & Omit<
  Chart3dOptions,
  'enabled'
>;

const Highcharts3dChart = ({
  children,
  alpha,
  axisLabelPosition,
  beta,
  depth,
  fitToPlot,
  frame,
  viewDistance,
  ...rest
}: Highcharts3dChartProps) => (
  <HighchartsChart chart={CHART} zAxis={ZAXIS} {...rest}>
    <Options3d
      alpha={alpha}
      axisLabelPosition={axisLabelPosition}
      beta={beta}
      depth={depth}
      fitToPlot={fitToPlot}
      frame={frame}
      viewDistance={viewDistance}
    />
    {children}
  </HighchartsChart>
);

export default Highcharts3dChart;
