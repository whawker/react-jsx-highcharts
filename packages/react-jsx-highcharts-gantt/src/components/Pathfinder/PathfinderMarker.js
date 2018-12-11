import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { getModifiedProps } from 'react-jsx-highcharts';

class PathfinderMarker extends Component {
  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    align: 'center',
    color: null,
    height: null,
    inside: false,
    lineColor: null,
    lineWidth: 1,
    radius: null,
    verticalAlign: 'middle',
    width: null,
    enabled: true,
    markerType: 'marker'
  };

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePathfinderMarker({
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updatePathfinderMarker(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updatePathfinderMarker, { enabled: false });
  }

  updatePathfinderMarker = config => {
    const { getChart, markerType } = this.props
    const chart = getChart();
    chart.update({
      pathfinder: {
        [markerType]: config
      }
    }, true);
  }

  render () {
    return null
  }
}

export default PathfinderMarker;
