import React from 'react';
import PathfinderMarker from './PathfinderMarker';

const PathfinderStartMarker = props => (
  <PathfinderMarker symbol="diamond" {...props} markerType="startMarker" />
)
export default PathfinderStartMarker;
