import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseChart from '../BaseChart';

class HighchartsChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  render () {
    return (
      <BaseChart
        {...this.props}
        chartCreationFunc={this.props.getHighcharts().chart}
        chartType="chart" />
    );
  }
}

export default HighchartsChart;
