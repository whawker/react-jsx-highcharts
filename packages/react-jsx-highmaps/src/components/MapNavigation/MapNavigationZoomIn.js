import React from 'react';
import MapNavigationButton from './MapNavigationButton';

const MapNavigationZoomIn = props => (
  <MapNavigationButton type='zoomIn' {...props} />
);

MapNavigationZoomIn.defaultProps = {
  children: '+',
  onClick: function () {
    this.mapZoom(0.5);
  },
  y: 0
};

export default MapNavigationZoomIn;
