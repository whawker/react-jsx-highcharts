import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import PlotBandLabel from './PlotBandLabel';
import Hidden from '../Hidden';

class PlotBand extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    from: PropTypes.any.isRequired,
    to: PropTypes.any.isRequired,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
    color: PropTypes.string
  };

  static defaultProps = {
    color: '#ccffff'
  };

  constructor (props, context) {
    super(props, context);

    this.getAxis = this.getAxis.bind(this);
    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { axisId, dimension, ...rest } = this.props;
    this.getAxis().addPlotBand(rest);
    this.setState({
      rendered: true
    });
  }

  componentWillUnmount () {
    const axis = this.getAxis();
    axis && axis.removePlotBand(this.props.id);
  }

  getAxis () {
    return this.context.chart.get(this.props.axisId);
  }

  render () {
    const { children, ...rest } = this.props;
    if (!children || !this.state.rendered) return null;

    const bandChildren = Children.map(children, child => {
      if (child.type === PlotBandLabel) {
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
