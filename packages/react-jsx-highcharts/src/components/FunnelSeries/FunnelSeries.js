import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class FunnelSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
  };

  render () {
    return (
      <Series {...this.props} type="funnel" requiresAxis={false} />
    );
  }
}

export default FunnelSeries;
