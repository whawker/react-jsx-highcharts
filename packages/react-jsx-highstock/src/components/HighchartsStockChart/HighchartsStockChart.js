import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import BaseChart from 'react-jsx-highcharts/src/components/BaseChart';

class HighchartsStockChart extends Component {
  static childContextTypes = {
    chartType: PropTypes.string.isRequired
  };

  getChildContext () {
    return {
      chartType: 'stockChart'
    };
  }

  render () {
    return (
      <BaseChart {...this.props} chartCreationFunc={Highcharts.stockChart} />
    );
  }
}

export default HighchartsStockChart;
