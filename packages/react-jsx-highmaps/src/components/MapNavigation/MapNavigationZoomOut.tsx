import * as React from 'react';
import MapNavigationButton from './MapNavigationButton';

import type { MapNavigationButtonsZoomOutOptions } from 'highcharts';

const DEFAULT_ONCLICK: MapNavigationButtonsZoomOutOptions['onclick'] =
  function () {
    // @ts-expect-error untyped in Highcharts
    this.mapZoom(2);
  };

type MapNavigationZoomOutProps = {
  children?: string;
  onClick?: MapNavigationButtonsZoomOutOptions['onclick'];
} & Omit<MapNavigationButtonsZoomOutOptions, 'text' | 'onclick'>;

const MapNavigationZoomOut = ({
  children = '-',
  onClick = DEFAULT_ONCLICK,
  y = 28,
  ...restProps
}: MapNavigationZoomOutProps) => (
  <MapNavigationButton type="zoomOut" onClick={onClick} y={y} {...restProps}>
    {children}
  </MapNavigationButton>
);

export default MapNavigationZoomOut;
