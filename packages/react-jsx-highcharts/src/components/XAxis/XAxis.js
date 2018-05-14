import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class XAxis extends Component {

  static propTypes = {
    type: PropTypes.string,
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };


  render () {
    let { getChart, ...rest } = this.props;
    const chart = getChart();
    const type = (chart.getType() === 'stockChart') ? 'datetime' : 'linear';

    return (
      <Axis type={type} {...rest} isX />
    );
  }
}

export default XAxis;
