import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BaseChart from '../BaseChart';

class HighchartsChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

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
      <BaseChart {...this.props} chartCreationFunc={this.props.getHighcharts().chart} />
    );
  }
}

export default HighchartsChart;
