import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class XAxis extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string
  };

  static defaultProps = {
    id: 'xAxis'
  };

  render () {
    let { getChartType, type, ...rest } = this.props;
    if (!type) {
      const chartType = getChartType();
      type = (chartType === 'stockChart') ? 'datetime' : 'linear';
    }

    return (
      <Axis {...rest} type={type} dimension="x" />
    );
  }
}

export default XAxis;
