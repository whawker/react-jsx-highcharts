import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HighchartsGanttChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };


  render () {
    const { chart, ...rest } = this.props;

    return (
      null
    );
  }
}

export default HighchartsGanttChart;
