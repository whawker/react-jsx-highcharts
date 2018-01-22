import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class SankeySeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="sankey" />
    );
  }
}

export default SankeySeries;
