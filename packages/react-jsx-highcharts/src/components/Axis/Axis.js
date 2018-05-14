import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import isFunction from 'lodash/isFunction';
import attempt from 'lodash/attempt';
import { Provider } from '../AxisContext';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static propTypes = {
    type: validAxisTypes,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    children: PropTypes.node,
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    dynamicAxis: PropTypes.bool.isRequired
  };

  static defaultProps = {
    id: uuid,
    children: null,
    dynamicAxis: true
  };

  componentDidMount () {
    const { dynamicAxis, isX, getChart } = this.props;
    const chart = getChart();

    // Create Highcharts Axis
    const opts = this.getAxisConfig();
    if (dynamicAxis) {
      this.axis = chart.addAxis(opts, isX, true);
    } else {
      // ZAxis cannot be added dynamically, update instead
      this.axis = chart.get('zAxis');
      this.axis.update(opts, true);
    }

    const update = this.axis.update.bind(this.axis)
    addEventProps(update, this.props);

    // Re-render to pass this.axis to Provider
    this.forceUpdate();
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.axis.update(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.axis.remove.bind(this.axis)); // Axis may have already been removed, i.e. when Chart unmounted
  }

  getAxisConfig = () => {
    const { id: axisId, ...rest } = this.props;

    const id = isFunction(axisId) ? axisId() : axisId
    const nonEventProps = getNonEventHandlerProps(rest);
    return {
      id,
      title: { text: null },
      ...nonEventProps
    }
  }

  render () {
    if (!this.axis) return null;

    return (
      <Provider value={this.axis}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Axis;
