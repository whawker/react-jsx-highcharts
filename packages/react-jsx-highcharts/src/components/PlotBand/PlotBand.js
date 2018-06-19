import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import isFunction from 'lodash/isFunction';
import attempt from 'lodash/attempt';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class PlotBand extends Component {

  static propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]).isRequired,
    from: PropTypes.any.isRequired,
    to: PropTypes.any.isRequired,
    color: PropTypes.string,
    getAxis: PropTypes.func // Provided by AxisProvider
  };

  static defaultProps = {
    id: uuid
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const axis = this.props.getAxis();

    // Create Highcharts Plot Band on Axis
    const opts = this.getPlotBandConfig();
    axis.addPlotBand(opts);

    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    if (getModifiedProps(prevProps, this.props) === false) return;

    const axis = this.props.getAxis();
    // Plot Bands cannot be updated, we have to remove and re-add
    const opts = this.getPlotBandConfig();
    axis.removePlotBand(opts.id);
    axis.addPlotBand(opts);
  }

  componentWillUnmount () {
    const axis = this.props.getAxis();
    attempt(axis.removePlotBand, this.id);
  }

  getPlotBandConfig = () => {
    const { id, children, ...rest } = this.props;
    if (!this.id) {
      this.id = isFunction(id) ? id() : id
    }

    return {
      id: this.id,
      ...rest
    }
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    const bandChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, { id: this.id });
    });

    return (
      <Hidden>
        {bandChildren}
      </Hidden>
    );
  }
}

export default PlotBand;
