import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from 'react-jsx-highcharts/src/components/Hidden';
import getModifiedProps from 'react-jsx-highcharts/src/utils/getModifiedProps';

class RangeSelector extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.rangeSelector),
    enabled: true
  };

  constructor (props) {
    super(props);

    this.updateRangeSelector = this.updateRangeSelector.bind(this);
    this.renderRangeSelector = this.renderRangeSelector.bind(this);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { children, getChart, ...rest } = this.props;
    const chart = getChart();
    chart.rangeSelector = new Highcharts.RangeSelector(chart);
    this.updateRangeSelector({
      ...rest,
      inputEnabled: false
    });
    this.setState({
      rendered: true
    });

    Highcharts.addEvent(chart, 'redraw', this.renderRangeSelector);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelector(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateRangeSelector({
      enabled: false
    });
    Highcharts.removeEvent(this.props.getChart(), 'redraw', this.renderRangeSelector);
  }

  updateRangeSelector (config) {
    this.props.update({
      rangeSelector: config
    }, true);
  }

  renderRangeSelector (e) {
    const chart = this.props.getChart();
    chart.rangeSelector && chart.rangeSelector.render.call(chart.rangeSelector, e.min, e.max);
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default RangeSelector;
