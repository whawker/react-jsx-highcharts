import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';
import removeProvidedProps from '../../utils/removeProvidedProps';

class Tooltip extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    children: null,
    enabled: true
  };

  componentDidMount () {
    const { children, getHighcharts, getChart, ...rest } = this.props;
    const Highcharts = getHighcharts();

    const chartObj = getChart().object;
    const opts = removeProvidedProps({ ...rest });

    chartObj.tooltip = new Highcharts.Tooltip(chartObj, {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
      ...opts
    });
    this.updateTooltip(opts);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateTooltip(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateTooltip({
      enabled: false
    });
  }

  updateTooltip = config => {
    const chart = this.props.getChart();
    chart.update({
      tooltip: config
    }, true);
  }

  render () {
    return null;
  }
}

export default Tooltip;
