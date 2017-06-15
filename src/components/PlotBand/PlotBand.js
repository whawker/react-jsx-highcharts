import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import PlotBandLabel from './PlotBandLabel';
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

  static defaultProps = {
    color: '#ccffff'
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { axisId, dimension, ...rest } = this.props;
    this.props.addPlotBand(rest);
    this.setState({
      rendered: true
    });
  }

  componentWillUnmount () {
    this.props.removePlotBand(this.props.id);
  }

  render () {
    const { children, ...rest } = this.props;
    if (!children || !this.state.rendered) return null;

    const bandChildren = Children.map(children, child => {
      if (child.type.displayName.indexOf('PlotBandLabel') > -1) {
        return cloneElement(child, rest);
      }
      return child;
    });

    return (
      <Hidden>
        {bandChildren}
      </Hidden>
    );
  }
}

export default PlotBand;
