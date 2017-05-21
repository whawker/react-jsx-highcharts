import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import getModifiedProps from '../../utils/getModifiedProps';
import { validSeriesTypes } from '../../utils/propTypeValidators';

class Series extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: validSeriesTypes.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    data: PropTypes.array,
    visible: PropTypes.bool
  };

  static defaultProps = {
    type: 'line',
    data: [],
    visible: true
  };

  constructor (props, context) {
    super(props, context);

    this.getSelf = this.getSelf.bind(this);
    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { children, dimension, axisId, ...rest } = this.props;
    this.context.chart.addSeries({
      //[`${dimension}Axis`]: axisId,
      ...rest
    }, true);
    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    const { visible, data, ...rest } = this.props;

    // Using setData is more performant than update
    if (isEqual(data, prevProps.data) === false) {
      this.getSelf().setData(data, true);
    }
    if (visible !== prevProps.visible) {
      this.getSelf().setVisible(visible);
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      this.getSelf().update(modifiedProps);
    }
  }

  componentWillUnmount () {
    const series = this.getSelf();
    series && series.remove();
  }

  getSelf () {
    return this.context.chart.get(this.props.id);
  }

  render () {
    const { children } = this.props;
    return (children && this.state.rendered) ? children : null;
  }
}

export default Series;
