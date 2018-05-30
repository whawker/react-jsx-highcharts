import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Options3d extends Component {

  static propTypes = {
    alpha: PropTypes.number.isRequired,
    axisLabelPosition: PropTypes.string,
    beta: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    fitToPlot: PropTypes.bool.isRequired,
    frame: PropTypes.object,
    viewDistance: PropTypes.number.isRequired,
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };

  static defaultProps = {
    enabled: false,
    alpha: 0,
    beta: 0,
    depth: 100,
    fitToPlot: true,
    viewDistance: 25,
    axisLabelPosition: 'default',
    frame: {
      visible: 'default',
      size: 1,
      bottom: {},
      top: {},
      left: {},
      right: {},
      back: {},
      front: {}
    }
  };

  componentDidMount () {
    this.update3dOptions();
  }

  componentDidUpdate () {
    this.update3dOptions();
  }

  update3dOptions = () => {
    const {
      alpha, axisLabelPosition, beta, depth, fitToPlot, frame, viewDistance, getChart
    } = this.props;

    const opts = {
      chart: {
        options3d: {
          enabled: true,
          alpha,
          axisLabelPosition,
          beta,
          depth,
          fitToPlot,
          frame,
          viewDistance
        }
      }
    };
    const chart = getChart();
    chart.update(opts, true);
  }

  render () {
    return null;
  }
}

export default Options3d;
