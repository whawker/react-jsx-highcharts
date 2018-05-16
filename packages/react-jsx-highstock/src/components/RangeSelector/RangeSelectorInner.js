import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hidden, getModifiedProps, provideAxis } from 'react-jsx-highcharts';

class RangeSelectorInner extends Component {

  static propTypes = {
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { getHighcharts, getChart, getAxis } = this.props;

    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const Highcharts = getHighcharts();
    const chartObj = getChart().object;
    chartObj.options.rangeSelector.enabled = true;
    Highcharts.fireEvent(chartObj, 'init'); // Pre Highcharts 6.1
    Highcharts.fireEvent(chartObj, 'afterGetContainer'); // Highcharts 6.1+

    const opts = this.getRangeSelectorConfig();
    this.updateRangeSelector(opts);

    const axisObj = getAxis().object;
    Highcharts.addEvent(axisObj, 'afterSetExtremes', this.setRendered);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.rendered !== prevState.rendered) {
      const { getChart, getAxis } = this.props;
      const chartObj = getChart().object;
      const axis = getAxis();
      const extremes = axis.getExtremes();
      // Fixes #40
      chartObj.rangeSelector.render.call(chartObj.rangeSelector, extremes.min, extremes.max);
    }

    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateRangeSelector(modifiedProps);
    }
  }

  componentWillUnmount () {
    const { getHighcharts, getAxis } = this.props;
    const axisObj = getAxis().object;
    getHighcharts().removeEvent(axisObj, 'afterSetExtremes', this.setRendered);

    this.updateRangeSelector({
      enabled: false
    });
  }

  setRendered = () => {
    this.setState({
      rendered: true
    });
  }

  getRangeSelectorConfig = () => {
    const { getHighcharts, children, ...rest } = this.props;
    const Highcharts = getHighcharts();

    return {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.rangeSelector),
      ...rest,
      inputEnabled: false,
      buttons: []
    };
  }

  updateRangeSelector = config => {
    const chart = this.props.getChart();
    chart.update({
      rangeSelector: config
    }, true);
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default provideAxis(RangeSelectorInner);

// For testing purposes
export const _RangeSelectorInner = RangeSelectorInner;
