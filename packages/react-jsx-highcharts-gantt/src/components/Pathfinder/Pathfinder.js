import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { getModifiedProps } from 'react-jsx-highcharts';

class Pathfinder extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    dashStyle: PropTypes.string(),
    enabled: PropTypes.bool.isRequired,
    lineColor: PropTypes.string(),
    lineWidth: PropTypes.number(),
    type: PropTypes.string()
  };

  static defaultProps = {
    algorithmMargin: null,
    dashStyle: 'solid',
    enabled: true,
    lineColor: null,
    lineWidth: 1,
    marker: {
      enabled: false
    },
    startMarker: {
      enabled: false
    },
    endMarker: {
      enabled: false
    },
    type: 'straight|simpleConnect'
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePathfinder({
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updatePathfinder(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updatePathfinder, { enabled: false });
  }

  updatePathfinder = config => {
    const chart = this.props.getChart();
    chart.update({
      pathfinder: config
    }, true);
  }

  render () {
    return this.props.children;
  }
}

export default Pathfinder;
