import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class AreaRangeSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="arearange" />
    );
  }
}

export default AreaRangeSeries;
