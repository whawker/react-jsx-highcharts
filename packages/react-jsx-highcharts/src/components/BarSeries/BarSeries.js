import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class BarSeries extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };

  componentDidMount () {
    const chart = this.props.getChart();
    chart.update({
      chart: {
        inverted: true
      }
    });
  }

  render () {
    return (
      <Series {...this.props} type="bar" />
    );
  }
}

export default BarSeries;
