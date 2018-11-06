import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import getModifiedProps from '../../utils/getModifiedProps';

class Tooltip extends Component {

  static propTypes = {
    getChart: PropTypes.func, // Provided by ChartProvider
    needsRedraw: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    children: null,
    enabled: true
  };

  componentDidMount () {
    const { children, getHighcharts, getChart, needsRedraw, ...rest } = this.props;
    const Highcharts = getHighcharts();

    const chartObj = getChart().object;

    chartObj.tooltip = new Highcharts.Tooltip(chartObj, {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
      ...rest
    });
    this.updateTooltip(rest);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateTooltip(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateTooltip, { enabled: false });
  }

  updateTooltip = config => {
    const chart = this.props.getChart();
    chart.update({
      tooltip: config
    }, false);
    this.props.needsRedraw();
  }

  render () {
    return null;
  }
}

export default Tooltip;
