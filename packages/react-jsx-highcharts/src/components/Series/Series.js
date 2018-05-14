import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import attempt from 'lodash/attempt';
import isImmutable from 'is-immutable';
import immutableEqual from 'immutable-is';
import { Provider } from '../SeriesContext';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

class Series extends Component {

  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.any,
    visible: PropTypes.bool,
    getChart: PropTypes.func, // Provided by ChartProvider
    getAxis: PropTypes.func, // Provided by AxisProvider
  };

  static defaultProps = {
    type: 'line',
    id: uuid,
    children: null,
    data: [],
    requiresAxis: true,
    visible: true
  };

  componentDidMount () {
    const chart = this.props.getChart();

    // Create Highcharts Series
    const opts = this.getSeriesConfig();
    this.series = chart.addSeries(opts, true);

    const update = this.series.update.bind(this.series)
    addEventProps(update, this.props);

    // Re-render to pass this.series to Provider
    this.forceUpdate();
  }

  componentDidUpdate (prevProps) {
    const { visible, data, ...rest } = this.props;

    // Using setData is more performant than update
    if (isImmutable(data) && immutableEqual(data, prevProps.data) === false) {
      this.series.setData(data.toJS(), true);
    } else if (isEqual(data, prevProps.data) === false) {
      this.series.setData(data, true);
    }
    if (visible !== prevProps.visible) {
      this.series.setVisible(visible);
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      this.series.update(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.series.remove.bind(this.series)); // Series may have already been removed, i.e. when Axis unmounted
  }

  getSeriesConfig = () => {
    const { id: seriesId, data: seriesData, requiresAxis, getAxis, children, ...rest } = this.props;

    const id = isFunction(seriesId) ? seriesId() : seriesId
    const data = isImmutable(seriesData) ? seriesData.toJS() : seriesData;
    const nonEventProps = getNonEventHandlerProps(rest);

    const config = {
      id,
      data,
      ...nonEventProps
    }

    if (requiresAxis) {
      const axis = getAxis();
      config[axis.type] = axis.id;
    }

    return config;
  }

  render () {
    if (!this.series) return null;

    return (
      <Provider value={this.series}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Series;
