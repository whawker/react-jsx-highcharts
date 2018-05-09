import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Provider } from '../AxisContext';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static propTypes = {
    type: validAxisTypes,
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    dynamicAxis: PropTypes.bool.isRequired
  };

  static defaultProps = {
    id: uuid(),
    children: null,
    dynamicAxis: true
  };

  componentWillMount () {
    const { dynamicAxis, isX, getChart, ...rest } = this.props;
    const nonEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    if (dynamicAxis) {
      this.axis = chart.addAxis(Object.assign({title: {text: null}}, nonEventProps), isX, true);
    } else {
      // ZAxis cannot be added dynamically, update instead
      this.axis = chart.get('zAxis');
      this.axis.update(Object.assign({ title: { text: null } }, nonEventProps), true);
    }
  }

  componentDidMount () {
    const update = this.axis.update.bind(this.axis)
    addEventProps(update, this.props);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.axis.update(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.axis.remove();
  }

  render () {
    return (
      <Provider value={this.axis}>
        {this.props.children}
      </Provider>
    );
  }
}

export default Axis;
