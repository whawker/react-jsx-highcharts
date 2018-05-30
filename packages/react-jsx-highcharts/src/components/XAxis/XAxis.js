import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

class XAxis extends Component {

  static propTypes = {
    type: PropTypes.string,
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };


  render () {
    let { getChart, id, ...rest } = this.props;
    const chart = getChart();
    const isStockChart = chart.type === 'stockChart';
    const type = isStockChart ? 'datetime' : 'linear';
    const axisId = isStockChart ? 'xAxis' : id;

    return (
      <Axis type={type} {...rest} id={axisId} isX />
    );
  }
}

export default XAxis;
