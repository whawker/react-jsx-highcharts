import { useEffect, memo } from 'react';
import { log3DModuleErrorMessage } from '../../utils/warnings';
import useHighcharts from '../UseHighcharts';
import useChart from '../UseChart';

import type { Chart3dOptions } from 'highcharts';
import type { ChartContextValue } from '../UseChart';

const DEFAULT_FRAME = {
  visible: 'default',
  size: 1,
  bottom: {},
  top: {},
  left: {},
  right: {},
  back: {},
  front: {}
};

type Options3dProps = Chart3dOptions;

const Options3d = memo(
  ({
    enabled = false,
    alpha = 0,
    beta = 0,
    depth = 100,
    fitToPlot = true,
    viewDistance = 25,
    // @ts-expect-error 'default' is not assignable to type AxisLabelPosition
    axisLabelPosition = 'default',
    frame = DEFAULT_FRAME,
    ...restProps
  }: Options3dProps) => {
    const props = {
      enabled,
      alpha,
      beta,
      depth,
      fitToPlot,
      viewDistance,
      axisLabelPosition,
      frame,
      ...restProps
    };
    const Highcharts = useHighcharts();
    const chart = useChart();

    // @ts-expect-error TODO
    if (process.env.NODE_ENV === 'development') {
      // @ts-expect-error TODO
      if (!Highcharts.ZAxis) log3DModuleErrorMessage();
    }

    useEffect(() => {
      update3dOptions(chart, props);
    });

    return null;
  }
);

const update3dOptions = (chart: ChartContextValue, props: Chart3dOptions) => {
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

Options3d.displayName = 'Options3d';

export default Options3d;
