import React, { Component } from 'react';
import HighchartsChart from '../HighchartsChart';
import Options3d from '../Options3d';

class Highcharts3dChart extends Component {

  static propTypes = Options3d.propTypes;

  render () {
    const {
      children, alpha, axisLabelPosition, beta, depth, fitToPlot, frame, viewDistance, ...rest
    } = this.props;

    const chart = {
      options3d: { enabled: true }
    };
    const zAxis = {
      id: 'zAxis'
    };

    return (
      <HighchartsChart chart={chart} zAxis={zAxis} {...rest}>
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
