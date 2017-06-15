import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class Tooltip extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static defaultProps = {
    ...Highcharts.defaultOptions.tooltip
  };

  constructor (props, context) {
    super(props, context);

    this.updateTooltip = this.updateTooltip.bind(this);
  }

  componentDidMount () {
    const { chart } = this.context;
    const { children, ...rest } = this.props;
    chart.tooltip = new Highcharts.Tooltip(chart, {
      ...rest,
      enabled: true
    });
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
    this.context.chart.tooltip.update({
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
