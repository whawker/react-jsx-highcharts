import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class ZAxis extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'linear'
  };

  render () {
    return (
      <Axis {...this.props} id="zAxis" dimension="z" dynamicAxis={false} />
    );
  }
}

ZAxis.Title = Axis.Title;
export default ZAxis;
