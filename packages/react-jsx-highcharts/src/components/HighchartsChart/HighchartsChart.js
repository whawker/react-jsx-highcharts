import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import BaseChart from '../BaseChart';

class HighchartsChart extends Component {
  static childContextTypes = {
    chartType: PropTypes.string.isRequired
  };

  getChildContext () {
    return {
      chartType: 'chart'
    };
  }

  render () {
    return (
      <BaseChart {...this.props} chartCreationFunc={Highcharts.chart} />
    );
  }
}

export default HighchartsChart;
