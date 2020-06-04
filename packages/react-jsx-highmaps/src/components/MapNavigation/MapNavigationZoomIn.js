import * as React from 'react';
import MapNavigationButton from './MapNavigationButton';

const DEFAULT_ONCLICK = function () {
  this.mapZoom(0.5);
};

const MapNavigationZoomIn = ({
  children = '+',
  onClick = DEFAULT_ONCLICK,
  y = 0,
  ...restProps
}) => (
  <MapNavigationButton type="zoomIn" onClick={onClick} y={y} {...restProps}>
    {children}
  </MapNavigationButton>
);

export default MapNavigationZoomIn;
