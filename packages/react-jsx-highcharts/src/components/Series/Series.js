import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isImmutable from 'is-immutable';
import immutableEqual from 'immutable-is';
import uuid from 'uuid/v4';
import { Provider } from '../SeriesContext';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

class Series extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    data: PropTypes.any,
    visible: PropTypes.bool,
    addSeries: PropTypes.func, // Provided by ChartProvider
    update: PropTypes.func, // Provided by SeriesProvider
    remove: PropTypes.func, // Provided by SeriesProvider
    setData: PropTypes.func, // Provided by SeriesProvider
    setVisible: PropTypes.func, // Provided by SeriesProvider
    getSeries: PropTypes.func, // Provided by SeriesProvider
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    id: uuid(),
    type: 'line',
    children: null,
    data: [],
    requiresAxis: true,
    visible: true
  };

  componentWillMount () {
    const { data, requiresAxis, getChart, getAxis, children, ...rest } = this.props;
    const seriesData = isImmutable(data) ? data.toJS() : data;
    const nonEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    const opts = {
      data: seriesData,
      ...nonEventProps
    }

    if (requiresAxis) {
      const axis = getAxis();
      opts[axis.type] = axis.id;
    }

    this.series = chart.addSeries(opts, true);
  }

  componentDidMount () {
    const update = this.series.update.bind(this.series)
    addEventProps(update, this.props);
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
    if (this.series) {
      this.series.remove(); // Series may have already been removed, i.e. when Axis unmounted
    }
  }

  render () {
    return (
      <Provider value={this.series}>
        {this.props.children}
      </Provider>
    )
  }
}

export default Series;
