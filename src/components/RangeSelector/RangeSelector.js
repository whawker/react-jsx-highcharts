import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class RangeSelector extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.updateRangeSelector = this.updateRangeSelector.bind(this);
    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { chart } = this.context;
    const { children, ...rest } = this.props;
    chart.rangeSelector = new Highcharts.RangeSelector(chart);
    this.updateRangeSelector({
      ...rest,
      inputEnabled: false,
      enabled: true
    });
    this.setState({
      rendered: true
    });

    Highcharts.addEvent(
      chart,
      'redraw',
      function (e) {
        chart.rangeSelector.render(e.min, e.max);
      }
    );
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
  }

  updateRangeSelector (config) {
    this.context.chart.update({
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

export default RangeSelector;
