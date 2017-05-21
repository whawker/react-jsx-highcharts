import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class ColumnRangeSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="columnrange" />
    );
  }
}

export default ColumnRangeSeries;
