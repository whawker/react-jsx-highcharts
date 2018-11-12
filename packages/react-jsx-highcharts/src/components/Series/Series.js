import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { isFunction } from 'lodash-es';
import { attempt } from 'lodash-es';
import { Provider } from '../SeriesContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { logSeriesErrorMessage } from '../../utils/warnings';

class Series extends PureComponent {

  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    type: PropTypes.string.isRequired,
    data: PropTypes.any,
    visible: PropTypes.bool,
    getChart: PropTypes.func, // Provided by ChartProvider
    needsRedraw: PropTypes.func, // Provided by ChartProvider
    getAxis: PropTypes.func // Provided by AxisProvider
  };

  static defaultProps = {
    type: 'line',
    id: uuid,
    children: null,
    data: [],
    requiresAxis: true,
    visible: true
  };

  constructor (props) {
    super(props);

    if (process.env.NODE_ENV === 'development') {
      const { type, getHighcharts } = props;
      const seriesTypes = Object.keys(getHighcharts().seriesTypes);
      if (seriesTypes.indexOf(type) === -1) logSeriesErrorMessage(type)
    }
  }

  componentDidUpdate (prevProps) {
    const { visible, data, ...rest } = this.props;

    let needsRedraw = false;
    // Using setData is more performant than update
    if (data !== prevProps.data) {
      this.series.setData(data, false);
      needsRedraw = true;
    }
    if (visible !== prevProps.visible) {
      this.series.setVisible(visible, false);
      needsRedraw = true;
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      this.series.update(modifiedProps, false);
      needsRedraw = true;
    }
    if (needsRedraw) {
      this.props.needsRedraw();
    }
  }
  componentDidMount () {
    this.props.needsRedraw();
  }

  componentWillUnmount () {
    if (this.series && this.series.remove) {
      // Series may have already been removed, i.e. when Axis unmounted
      attempt(this.series.remove.bind(this.series), false);
      this.props.needsRedraw();
    }
  }

  getSeriesConfig = () => {
    const { id, data, requiresAxis, getAxis, children, ...rest } = this.props;

    const seriesId = isFunction(id) ? id() : id
    const nonEventProps = getNonEventHandlerProps(rest);
    const events = getEventsConfig(rest);

    const config = {
      id: seriesId,
      data,
      events,
      ...nonEventProps
    }

    if (requiresAxis) {
      const axis = getAxis();
      config[axis.type] = axis.id;
    }

    return config;
  }

  createSeries = () => {
    const chart = this.props.getChart();

    // Create Highcharts Series
    const opts = this.getSeriesConfig();

    this.series = chart.addSeries(opts, false);
  }

  render () {
    if (!this.series) this.createSeries();

    return (
      <Provider value={this.series}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Series;
