import React from 'react';
import MapNavigationButton from './MapNavigationButton';

const MapNavigationZoomOut = props => (
  <MapNavigationButton type='zoomOut' {...props} />
);

MapNavigationZoomOut.defaultProps = {
  children: '-',
  onClick: function () {
    this.mapZoom(2);
  },
  y: 28
};

export default MapNavigationZoomOut;
