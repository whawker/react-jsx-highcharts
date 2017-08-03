import React, { Component, Children, cloneElement } from 'react';
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
    remove: PropTypes.func // Provided by AxisProvider
  };

  componentWillMount () {
    const { children, dimension, addAxis, ...rest } = this.props;
    const isX = dimension.toLowerCase() === 'x';

    const nonEventProps = getNonEventHandlerProps(rest);
    addAxis(Object.assign({ title: { text: null } }, nonEventProps), isX, true);
  }

  componentDidMount () {
    const { getAxis, ...rest } = this.props;
    addEventProps(getAxis(), rest);
  }

  componentDidUpdate (prevProps) {
    const { update, ...rest } = this.props;
    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      update(modifiedProps);
    }
  }

  componentWillUnmount () {
    const { remove } = this.props;

    remove && remove();
  }

  render () {
    const { dimension, id, children } = this.props;
    if (!children) return null;

    const axisChildren = Children.map(children, child => {
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
