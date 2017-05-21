import React, { Component } from 'react';
import BaseChart from '../BaseChart';

class HighchartsStockChart extends Component {
  render () {
    return (
      <BaseChart chartType="stockChart" {...this.props} />
    );
  }
}

export default HighchartsStockChart;
