import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';
import { validAxisDimensions, validAxisTypes } from '../../utils/propTypeValidators';

class Axis extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    dimension: validAxisDimensions.isRequired,
    type: validAxisTypes,
    id: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  constructor (props, context) {
    super(props, context);

    this.getSelf = this.getSelf.bind(this);
  }

  componentWillMount () {
    const { children, dimension, ...rest } = this.props;
    const isX = dimension.toLowerCase() === 'x';
    this.context.chart.addAxis(rest, isX, true);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.getSelf().update(modifiedProps);
    }
  }

  componentWillUnmount () {
    const axis = this.getSelf();
    axis && axis.remove();
  }

  getSelf () {
    return this.context.chart.get(this.props.id);
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
