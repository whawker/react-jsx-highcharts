import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';

class PlotBand extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    from: PropTypes.any.isRequired,
    to: PropTypes.any.isRequired,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
    color: PropTypes.string,
    addPlotBand: PropTypes.func, // Provided by AxisProvider
    removePlotBand: PropTypes.func // Provided by AxisProvider
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { axisId, dimension, children, ...rest } = this.props;
    this.props.addPlotBand(rest);
    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    this.props.removePlotBand(prevProps.id);
    const { axisId, dimension, children, ...rest } = this.props;
    this.props.addPlotBand(rest);
  }

  componentWillUnmount () {
    if (this.props.getAxis()) {
      this.props.removePlotBand(this.props.id);
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
