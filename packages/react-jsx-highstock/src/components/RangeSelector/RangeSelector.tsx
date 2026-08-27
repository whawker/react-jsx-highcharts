import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  useHighcharts,
  useAxis,
  useChart,
  useModifiedProps
} from 'react-jsx-highcharts';

import type { RangeSelectorOptions } from 'highcharts';
import type * as Highcharts from 'highcharts';
import type { ReactNode } from 'react';
import type { AxisContextValue, ChartContextValue } from 'react-jsx-highcharts';

type RangeSelectorProps = {
  children?: ReactNode;
} & Partial<RangeSelectorOptions>;

const RangeSelector = ({
  enabled = true,
  children,
  ...restProps
}: RangeSelectorProps) => {
  const props = { enabled, ...restProps };
  const [rendered, setRendered] = useState(false);
  const Highcharts = useHighcharts();
  const chart = useChart();
  const axis = useAxis('xAxis');

  useEffect(() => {
    if (!axis) return;

    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    // @ts-expect-error does this need a type assertion?
    chartObj.options.rangeSelector.enabled = true;
    // Initialise RangeSelector (see https://github.com/highcharts/highcharts/blob/dd730ab/js/parts/RangeSelector.js#L1464-L1468)
    Highcharts.fireEvent(chartObj, 'afterGetContainer');

    const opts = getRangeSelectorConfig(props, Highcharts);
    updateRangeSelector(opts, chart);

    const renderRangeSelector = createRenderRangeSelector(chart, axis);
    const axisObj = axis.object;
    Highcharts.addEvent(axisObj, 'afterSetExtremes', renderRangeSelector);

    setRendered(true);

    return () => {
      const axisObj = axis.object;
      Highcharts.removeEvent(axisObj, 'afterSetExtremes', renderRangeSelector);
      try {
        updateRangeSelector({ enabled: false }, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, [axis]);

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if (!axis || !rendered) return;

    if (modifiedProps !== false) {
      updateRangeSelector(modifiedProps, chart);
    }
  });

  if (!children || !rendered) return null;

  return <>{children}</>;
};

const getRangeSelectorConfig = (
  props: Partial<RangeSelectorOptions>,
  highcharts: typeof Highcharts
) => {
  return {
    ...(highcharts.defaultOptions && highcharts.defaultOptions.rangeSelector),
    ...props,
    inputEnabled: false,
    buttons: []
  };
};

const updateRangeSelector = (
  config: Partial<RangeSelectorOptions>,
  chart: ChartContextValue
) => {
  chart.update({ rangeSelector: config }, true);
};

const createRenderRangeSelector = (
  chart: ChartContextValue,
  axis: AxisContextValue
) => {
  return () => {
    const chartObj = chart.object;
    const extremes = axis.getExtremes();
    // Fixes #40
    // @ts-expect-error does it need a type assertion?
    chartObj.rangeSelector.render.call(
      // @ts-expect-error does it need a type assertion?
      chartObj.rangeSelector,
      extremes.min,
      extremes.max
    );
  };
};

export default RangeSelector;
