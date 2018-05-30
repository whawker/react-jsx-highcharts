import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class TreemapSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="treemap" />
    );
  }
}

export default TreemapSeries;
