import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class GaugeSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="gauge" />
    );
  }
}

export default GaugeSeries;
