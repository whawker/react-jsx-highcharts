import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class PyramidSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="pyramid" />
    );
  }
}

export default PyramidSeries;
