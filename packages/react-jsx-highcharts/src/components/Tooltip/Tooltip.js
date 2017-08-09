import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class Tooltip extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.tooltip),
    enabled: true
  };

  constructor (props) {
    super(props);

    this.updateTooltip = this.updateTooltip.bind(this);
  }

  componentDidMount () {
    const { children, getChart, ...rest } = this.props;
    const chart = getChart();
    chart.tooltip = new Highcharts.Tooltip(chart, {
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
