import * as React from 'react';
import { XAxis } from 'react-jsx-highcharts';

const MapXAxis = ({
  endOnTick = false,
  visible = false,
  minPadding = 0,
  maxPadding = 0,
  startOnTick = false,
  ...restProps
}) => (
  <XAxis
    endOnTick={endOnTick}
    visible={visible}
    minPadding={minPadding}
    maxPadding={maxPadding}
    startOnTick={startOnTick}
    {...restProps}
    id="xAxis"
    dynamicAxis={false}
  />
);

export default MapXAxis;
