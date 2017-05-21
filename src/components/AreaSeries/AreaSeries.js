import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class AreaSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="area" />
    );
  }
}

export default AreaSeries;
