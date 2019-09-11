import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { log3DModuleErrorMessage } from '../../utils/warnings';
import useHighcharts from '../UseHighcharts';
import useChart from '../UseChart';

const Options3d = memo(props => {
  const Highcharts = useHighcharts();
  const chart = useChart();

  if (process.env.NODE_ENV === 'development') {
    if (!Highcharts.ZAxis) log3DModuleErrorMessage();
  }

  useEffect(() => {
    update3dOptions(chart, props);
  });

  return null;
});

const update3dOptions = (chart, props) => {
  const {
    alpha,
    axisLabelPosition,
    beta,
    depth,
    fitToPlot,
    frame,
    viewDistance
  } = props;

  const opts = {
    chart: {
      options3d: {
        enabled: true,
        alpha,
        axisLabelPosition,
        beta,
        depth,
        fitToPlot,
        frame,
        viewDistance
      }
    }
  };
  chart.update(opts, true);
};

Options3d.propTypes = {
  alpha: PropTypes.number.isRequired,
  axisLabelPosition: PropTypes.string,
  beta: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  fitToPlot: PropTypes.bool.isRequired,
  frame: PropTypes.object,
  viewDistance: PropTypes.number.isRequired
};

Options3d.defaultProps = {
  enabled: false,
  alpha: 0,
  beta: 0,
  depth: 100,
  fitToPlot: true,
  viewDistance: 25,
  axisLabelPosition: 'default',
  frame: {
    visible: 'default',
    size: 1,
    bottom: {},
    top: {},
    left: {},
    right: {},
    back: {},
    front: {}
  }
};

Options3d.displayName = 'Options3d';

export default Options3d;
