import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import Hidden from '../Hidden';

class PlotBand extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    from: PropTypes.any.isRequired,
    to: PropTypes.any.isRequired,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
    color: PropTypes.string,
    getAxis: PropTypes.func // Provided by AxisProvider
  };

  static defaultProps = {
    id: uuid()
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { getAxis, children, ...rest } = this.props;
    const axis = getAxis();
    axis.addPlotBand(rest);
    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    const { getAxis, children, ...rest } = this.props;
    const axis = getAxis();
    axis.removePlotBand(prevProps.id);
    axis.addPlotBand(rest);
  }

  componentWillUnmount () {
    const axis = this.props.getAxis();
    if (axis.object) {
      axis.removePlotBand(this.props.id);
    }
  }

  render () {
    const { children, ...rest } = this.props;
    if (!children || !this.state.rendered) return null;

    const bandChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, rest);
    });

    return (
      <Hidden>
        {bandChildren}
      </Hidden>
    );
  }
}

export default PlotBand;
