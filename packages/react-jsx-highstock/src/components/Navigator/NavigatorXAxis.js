import React, { Component } from 'react';
import NavigatorAxis from './NavigatorAxis';

class NavigatorXAxis extends Component {
  render () {
    return (
      <NavigatorAxis {...this.props} axisId="navigator-x-axis" dimension="x" />
    );
  }
}

export default NavigatorXAxis;
