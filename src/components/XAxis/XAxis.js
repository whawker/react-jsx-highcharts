import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class XAxis extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    id: 'datetime',
    type: 'datetime'
  };

  render () {
    return (
      <Axis {...this.props} dimension="x" />
    );
  }
}

XAxis.Title = Axis.Title;
export default XAxis;
