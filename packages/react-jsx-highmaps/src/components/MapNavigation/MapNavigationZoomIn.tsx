import * as React from 'react';
import MapNavigationButton from './MapNavigationButton';

import type { MapNavigationButtonsZoomInOptions } from 'highcharts';

const DEFAULT_ONCLICK: MapNavigationButtonsZoomInOptions['onclick'] =
  function () {
    // @ts-expect-error untyped in Highcharts
    this.mapZoom(0.5);
  };

type MapNavigationZoomInProps = {
  children?: string;
  onClick?: MapNavigationButtonsZoomInOptions['onclick'];
} & Omit<MapNavigationButtonsZoomInOptions, 'text' | 'onclick'>;

const MapNavigationZoomIn = ({
  children = '+',
  onClick = DEFAULT_ONCLICK,
  y = 0,
  ...restProps
}: MapNavigationZoomInProps) => (
  <MapNavigationButton type="zoomIn" onClick={onClick} y={y} {...restProps}>
    {children}
  </MapNavigationButton>
);

export default MapNavigationZoomIn;
