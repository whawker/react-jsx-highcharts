import * as React from 'react';
import { useMemo } from 'react';
import HighchartsChart from '../HighchartsChart';
import Chart from '../Chart';
import XAxis from '../XAxis';
import YAxis from '../YAxis';

import type { ReactNode } from 'react';
import type { ChartProps } from '../Chart/Chart';
import type { HighchartsChartProps } from '../HighchartsChart/HighchartsChart';

const defaultSparklinePlotOptions: HighchartsChartProps['plotOptions'] = {
  series: {
    animation: false,
    lineWidth: 1,
    shadow: false,
    states: {
      hover: {
        lineWidth: 1
      }
    },
    marker: {
      radius: 1,
      states: {
        hover: {
          radius: 2
        }
      }
    },
    // @ts-expect-error fillOpacity is missing from plotOptions
    fillOpacity: 0.25
  }
};

const EMPTY_ARRAY: number[] = [];
const EMPTY_OBJECT = {};
const ZERO_ARRAY = [0];
const LABELS_DISABLED = { enabled: false };
const DEFAULT_MARGIN = [2, 0, 2, 0];

type HighchartsSparklineProps = {
  height?: ChartProps['height'];
  width?: ChartProps['width'];
  margin?: ChartProps['margin'];
  style?: ChartProps['style'];
  series?: ReactNode;
  children?: ReactNode;
  plotOptions?: HighchartsChartProps['plotOptions'];
};

const HighchartsSparkline = ({
  height = 20,
  width = 120,
  margin = DEFAULT_MARGIN,
  style = EMPTY_OBJECT,
  series,
  children,
  plotOptions = defaultSparklinePlotOptions,
  ...rest
}: HighchartsSparklineProps) => {
  const chartStyle = useMemo(
    () => ({ overflow: 'visible', ...style }),
    [style]
  );

  const hasSeriesProp = !!series;
  // If you want to use functionality like Tooltips, pass the data component on the `series` prop
  const Series = hasSeriesProp ? series : children;

  return (
    <HighchartsChart plotOptions={plotOptions} {...rest}>
      <Chart
        height={height}
        width={width}
        animation={false}
        // @ts-expect-error backgroundColor does not allow null
        backgroundColor={null}
        borderWidth={0}
        margin={margin}
        style={chartStyle}
        skipClone
      />

      <XAxis
        labels={LABELS_DISABLED}
        startOnTick={false}
        endOnTick={false}
        tickPositions={EMPTY_ARRAY}
      />

      <YAxis
        id="sparkline"
        labels={LABELS_DISABLED}
        startOnTick={false}
        endOnTick={false}
        tickPositions={ZERO_ARRAY}
      >
        {Series}
      </YAxis>

      {hasSeriesProp && <>{children}</>}
    </HighchartsChart>
  );
};

export default HighchartsSparkline;
