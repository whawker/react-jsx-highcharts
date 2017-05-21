import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class FunnelSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="funnel" />
    );
  }
}

export default FunnelSeries;
