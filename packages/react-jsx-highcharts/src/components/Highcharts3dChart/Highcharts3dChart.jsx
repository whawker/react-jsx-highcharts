import * as React from 'react';
import HighchartsChart from '../HighchartsChart';
import Options3d from '../Options3d';

const CHART = {
  options3d: { enabled: true }
};
const ZAXIS = {
  id: 'zAxis'
};

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
}) => (
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
Highcharts3dChart.propTypes = Options3d.propTypes;

export default Highcharts3dChart;
