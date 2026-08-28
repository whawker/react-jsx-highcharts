import * as React from 'react';
import { XAxis } from 'react-jsx-highcharts';

import type { ComponentProps } from 'react';

export type MapAxisProps = {
  endOnTick?: boolean;
  visible?: boolean;
  minPadding?: number;
  maxPadding?: number;
  startOnTick?: boolean;
  reversed?: boolean;
};

export type MapXAxisProps = MapAxisProps & ComponentProps<typeof XAxis>;

const MapXAxis = ({
  endOnTick = false,
  visible = false,
  minPadding = 0,
  maxPadding = 0,
  startOnTick = false,
  ...restProps
}: MapXAxisProps) => (
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
