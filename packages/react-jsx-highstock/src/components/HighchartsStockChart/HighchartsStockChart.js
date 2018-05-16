import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaseChart } from 'react-jsx-highcharts';

class HighchartsStockChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  render () {
    return (
      <BaseChart
        {...this.props}
        chartCreationFunc={this.props.getHighcharts().stockChart}
        chartType="stockChart" />
    );
  }
}

export default HighchartsStockChart;
