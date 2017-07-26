import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class YAxis extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'linear'
  };

  render () {
    return (
      <Axis {...this.props} dimension="y" />
    );
  }
}

YAxis.Title = Axis.Title;
export default YAxis;
