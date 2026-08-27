import * as React from 'react';
import { YAxis } from 'react-jsx-highcharts';

import type { MapAxisProps } from '../XAxis/XAxis';

type MapYAxisProps = MapAxisProps<Highcharts.YAxisOptions>;

const MapYAxis = ({
  endOnTick = false,
  visible = false,
  minPadding = 0,
  maxPadding = 0,
  startOnTick = false,
  reversed = true,
  ...restProps
}: MapYAxisProps) => (
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
