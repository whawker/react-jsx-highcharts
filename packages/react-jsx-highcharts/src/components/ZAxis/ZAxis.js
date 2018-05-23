import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';
import { logZAxisErrorMessage } from '../../utils/warnings';

class ZAxis extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired
  };

  static defaultProps = {
    type: 'linear'
  };

  constructor (props) {
    super(props);

    if (process.env.NODE_ENV === 'development') {
      if (!this.props.getHighcharts().ZAxis) logZAxisErrorMessage();
    }
  }

  render () {
    return (
      <Axis {...this.props} id="zAxis" isX={false} dynamicAxis={false} />
    );
  }
}

ZAxis.Title = Axis.Title;
export default ZAxis;
