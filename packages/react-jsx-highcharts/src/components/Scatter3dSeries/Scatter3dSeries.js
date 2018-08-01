import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class Scatter3dSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="scatter3d" />
    );
  }
}

export default Scatter3dSeries;
