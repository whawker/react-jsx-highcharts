import React, { Component } from 'react';
import BaseChart from '../BaseChart';

class HighchartsChart extends Component {
  render () {
    return (
      <BaseChart chartType="chart" {...this.props} />
    );
  }
}

export default HighchartsChart;
