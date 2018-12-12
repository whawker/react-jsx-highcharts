import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import { Provider } from '../AxisContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static propTypes = {
    type: validAxisTypes,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    children: PropTypes.node,
    getChart: PropTypes.func, // Provided by ChartProvider
    needsRedraw: PropTypes.func, // Provided by ChartProvider
    dynamicAxis: PropTypes.bool.isRequired
  };

  static defaultProps = {
    id: uuid,
    children: null,
    dynamicAxis: true
  };

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.axis.update(modifiedProps, false);
      this.props.needsRedraw();
    }
  }

  componentDidMount () {
    this.props.needsRedraw();
  }

  componentWillUnmount () {
    if (this.axis.remove) {
      // Axis may have already been removed, i.e. when Chart unmounted
      attempt(this.axis.remove.bind(this.axis), false);
      this.props.needsRedraw();
    }
  }

  getAxisConfig = () => {
    const { id, children, ...rest } = this.props;

    const axisId = typeof id === 'function' ? id() : id
    const nonEventProps = getNonEventHandlerProps(rest);
    const events = getEventsConfig(rest);

    return {
      id: axisId,
      title: { text: null },
      events,
      ...nonEventProps
    }
  }

  createAxis = () => {
    const { id, dynamicAxis, isX, getChart } = this.props;
    const chart = getChart();

    // Create Highcharts Axis
    const opts = this.getAxisConfig();
    if (dynamicAxis) {
      this.axis = chart.addAxis(opts, isX, false);
    } else {
      // ZAxis cannot be added dynamically, Maps only have a single axes - update instead
      const axisId = typeof id === 'function' ? id() : id
      this.axis = chart.get(axisId);
      this.axis.update.call(this.axis, opts, false);
    }
  }

  render () {
    if (!this.axis) this.createAxis();

    return (
      <Provider value={this.axis}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Axis;
