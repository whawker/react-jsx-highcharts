import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';
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
    enabled: true
  };

  constructor (props) {
    super(props);

    this.updateTooltip = this.updateTooltip.bind(this);
  }

  componentDidMount () {
    const { children, getHighcharts, getChart, ...rest } = this.props;
    const Highcharts = getHighcharts();

    const chart = getChart();
    const opts = removeProvidedProps({ ...rest });

    chart.tooltip = new Highcharts.Tooltip(chart, {
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

  updateTooltip (config) {
    this.props.update({
      tooltip: config
    }, true);
  }

  render () {
    const { children } = this.props;
    if (!children) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default Tooltip;
