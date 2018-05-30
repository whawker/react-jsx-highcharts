import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class YAxis extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'linear'
  };

  render () {
    return (
      <Axis {...this.props} isX={false} />
    );
  }
}

YAxis.Title = Axis.Title;
export default YAxis;
