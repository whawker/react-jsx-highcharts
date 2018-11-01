import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import {getModifiedProps} from 'react-jsx-highcharts';

class Pathfinder extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired,
    dashStyle: PropTypes.string(),
    lineWidth: PropTypes.number()
  };

  static defaultProps = {
    enabled: true
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
