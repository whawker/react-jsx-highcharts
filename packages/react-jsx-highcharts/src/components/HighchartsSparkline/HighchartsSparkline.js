import * as React from 'react';
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import HighchartsChart from '../HighchartsChart';
import Chart from '../Chart';
import XAxis from '../XAxis';
import YAxis from '../YAxis';

const defaultSparklinePlotOptions = {
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
    fillOpacity: 0.25
  }
};

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};
const ZERO_ARRAY = [0];
const LABELS_DISABLED = { enabled: false };
const DEFAULT_MARGIN = [2, 0, 2, 0];

const HighchartsSparkline = ({
  height = 20,
  width = 120,
  margin = DEFAULT_MARGIN,
  style = EMPTY_OBJECT,
  series,
  children,
  plotOptions = defaultSparklinePlotOptions,
  ...rest
}) => {
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

HighchartsSparkline.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  margin: PropTypes.array,
  style: PropTypes.object,
  plotOptions: PropTypes.object,
  series: PropTypes.node,
  children: PropTypes.node
};

export default HighchartsSparkline;
