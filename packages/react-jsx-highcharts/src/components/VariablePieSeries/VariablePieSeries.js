import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class VariablePieSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="variablepie" requiresAxis={false} />
    );
  }
}

export default VariablePieSeries;
