import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isNumber from 'lodash/isNumber';
import Hidden from 'react-jsx-highcharts/src/components/Hidden';
import getModifiedProps from 'react-jsx-highcharts/src/utils/getModifiedProps';

class RangeSelector extends Component {

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

    this.updateRangeSelector = this.updateRangeSelector.bind(this);
    this.renderRangeSelector = this.renderRangeSelector.bind(this);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { children, getHighcharts, getChart, ...rest } = this.props;
    const Highcharts = getHighcharts();
    const chart = getChart();
    chart.rangeSelector = new Highcharts.RangeSelector(chart);
    const opts = {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.rangeSelector),
      ...rest,
      inputEnabled: false,
      buttons: []
    };
    this.updateRangeSelector(opts);
    this.setState({
      rendered: true
    });

    Highcharts.addEvent(chart, 'redraw', this.renderRangeSelector);
    this.renderRangeSelector()
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelector(modifiedProps);
    }
  }

  componentWillUnmount () {
    const { getHighcharts, getChart } = this.props;
    this.updateRangeSelector({
      enabled: false
    });
    getHighcharts().removeEvent(getChart(), 'redraw', this.renderRangeSelector);
  }

  updateRangeSelector (config) {
    this.props.update({
      rangeSelector: config
    }, true);
  }

  renderRangeSelector () {
    const chart = this.props.getChart();
    const extremes = chart.xAxis[0].getExtremes();

    if (isNumber(extremes.min)) {
      chart.rangeSelector && chart.rangeSelector.render.call(chart.rangeSelector, extremes.min, extremes.max);
    }
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
