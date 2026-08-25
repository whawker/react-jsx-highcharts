import * as React from 'react';
import { YAxis } from 'react-jsx-highcharts';

const MapYAxis = ({
  endOnTick = false,
  visible = false,
  minPadding = 0,
  maxPadding = 0,
  startOnTick = false,
  reversed = true,
  ...restProps
}) => (
  <YAxis
    endOnTick={endOnTick}
    visible={visible}
    minPadding={minPadding}
    maxPadding={maxPadding}
    startOnTick={startOnTick}
    reversed={reversed}
    {...restProps}
    id="yAxis"
    dynamicAxis={false}
  />
);

export default MapYAxis;
