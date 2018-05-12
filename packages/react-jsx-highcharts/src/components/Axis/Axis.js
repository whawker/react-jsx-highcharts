import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import attempt from 'lodash/attempt';
import { Provider } from '../AxisContext';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static propTypes = {
    type: validAxisTypes,
    id: PropTypes.string,
    children: PropTypes.node,
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    dynamicAxis: PropTypes.bool.isRequired
  };

  static defaultProps = {
    children: null,
    dynamicAxis: true
  };

  componentDidMount () {
    const { dynamicAxis, isX, getChart, id, ...rest } = this.props;
    rest.id = id || uuid();
    const nonEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    if (dynamicAxis) {
      this.axis = chart.addAxis(Object.assign({title: {text: null}}, nonEventProps), isX, true);
    } else {
      // ZAxis cannot be added dynamically, update instead
      this.axis = chart.get('zAxis');
      this.axis.update(Object.assign({ title: { text: null } }, nonEventProps), true);
    }
    const update = this.axis.update.bind(this.axis)
    addEventProps(update, this.props);
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

  render () {
    if (this.axis) {
      return (
        <Provider value={this.axis}>
          {this.props.children}
        </Provider>
      );
    } else {
      return null;
    }

  }
}

export default Axis;
