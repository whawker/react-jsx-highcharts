import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseChart from 'react-jsx-highcharts/src/components/BaseChart';

class HighchartsStockChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

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
      <BaseChart {...this.props} chartCreationFunc={this.props.getHighcharts().stockChart} />
    );
  }
}

export default HighchartsStockChart;
