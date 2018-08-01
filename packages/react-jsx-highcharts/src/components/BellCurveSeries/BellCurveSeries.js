import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class BellCurveSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    baseSeries: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="bellcurve" />
    );
  }
}

export default BellCurveSeries;
