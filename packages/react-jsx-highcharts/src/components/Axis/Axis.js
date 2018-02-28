import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisDimensions, validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static propTypes = {
    dimension: validAxisDimensions.isRequired,
    type: validAxisTypes,
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    addAxis: PropTypes.func, // Provided by ChartProvider
    update: PropTypes.func, // Provided by AxisProvider
    remove: PropTypes.func, // Provided by AxisProvider
    getAxis: PropTypes.func, // Provided by AxisProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    dynamicAxis: PropTypes.bool.isRequired
  };

  static defaultProps = {
    dynamicAxis: true
  };

  componentWillMount () {
    const { children, dimension, dynamicAxis, addAxis, update, ...rest } = this.props;
    const nonEventProps = getNonEventHandlerProps(rest);

    if (dynamicAxis) {
      const isX = dimension.toLowerCase() === 'x';
      addAxis(Object.assign({title: {text: null}}, nonEventProps), isX, true);
    } else {
      // ZAxis cannot be added dynamically, update instead
      update(Object.assign({ title: { text: null } }, nonEventProps), true);
    }
  }

  componentDidMount () {
    const { update, ...rest } = this.props;
    addEventProps(update, rest);
  }

  componentDidUpdate (prevProps) {
    const { update, ...rest } = this.props;
    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      update(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.props.remove();
  }

  render () {
    const { dimension, id, children } = this.props;
    if (!children) return null;

    const axisChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, { dimension, axisId: id });
    });

    return (
      <Hidden>
        {axisChildren}
      </Hidden>
    );
  }
}

export default Axis;
