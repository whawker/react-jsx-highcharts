import * as React from 'react';
import MapNavigationButton from './MapNavigationButton';

const DEFAULT_ONCLICK = function () {
  this.mapZoom(2);
};

const MapNavigationZoomOut = ({
  children = '-',
  onClick = DEFAULT_ONCLICK,
  y = 28,
  ...restProps
}) => (
  <MapNavigationButton type="zoomOut" onClick={onClick} y={y} {...restProps}>
    {children}
  </MapNavigationButton>
);

export default MapNavigationZoomOut;
