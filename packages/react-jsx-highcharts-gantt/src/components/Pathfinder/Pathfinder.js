import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import {getModifiedProps} from 'react-jsx-highcharts';

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
    dashStyle: "solid",
    enabled: true,
    endMarker: {
      align: "center",
      color: null,
      enabled: false,
      height: null,
      inside: false,
      lineColor: null,
      lineWidth: 1,
      radius: null,
      symbol: "arrow-filled",
      verticalAlign: "middle",
      width: null
    },
    lineColor: null,
    lineWidth: 1,
    marker: {
      align: "center",
      color: null,
      enabled: false,
      height: null,
      inside: false,
      lineColor: null,
      lineWidth: 1,
      radius: null,
      verticalAlign: "middle",
      width: null
    },
    startMarker: {
      align: "center",
      color: null,
      enabled: false,
      height: null,
      inside: false,
      lineColor: null,
      lineWidth: 1,
      radius: null,
      symbol: "diamond",
      verticalAlign: "middle",
      width: null
    },
    type: "straight|simpleConnect"
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
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
