import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class StreamGraphSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  render () {
    return (
      <Series {...this.props} type="streamgraph" />
    );
  }
}

export default StreamGraphSeries;
