import React, { Component } from 'react';
import HighchartsChart from '../HighchartsChart';
import Options3d from '../Options3d';

const CHART = {
  options3d: { enabled: true }
};
const ZAXIS = {
  id: 'zAxis'
};

class Highcharts3dChart extends Component {

  static propTypes = Options3d.propTypes;

  render () {
    const {
      children, alpha, axisLabelPosition, beta, depth, fitToPlot, frame, viewDistance, ...rest
    } = this.props;

    return (
      <HighchartsChart chart={CHART} zAxis={ZAXIS} {...rest}>
        <Options3d
          alpha={alpha}
          axisLabelPosition={axisLabelPosition}
          beta={beta}
          depth={depth}
          fitToPlot={fitToPlot}
          frame={frame}
          viewDistance={viewDistance} />
        {children}
      </HighchartsChart>
    );
  }
}

export default Highcharts3dChart;
