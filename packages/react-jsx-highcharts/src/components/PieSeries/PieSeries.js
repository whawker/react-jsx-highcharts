import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class PieSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="pie" requiresAxis={false} />
    );
  }
}

export default PieSeries;
