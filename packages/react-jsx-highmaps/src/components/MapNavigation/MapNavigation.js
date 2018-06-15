import React, { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import { Hidden, getModifiedProps } from 'react-jsx-highcharts';

class MapNavigation extends Component {

  static propTypes = {
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired, // Provided by HighchartsProvider
    enabled: PropTypes.bool.isRequired
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
    const { getHighcharts, getChart } = this.props;

    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const Highcharts = getHighcharts();
    const chartObj = getChart().object;
    chartObj.options.mapNavigation.enabled = true;
    Highcharts.fireEvent(chartObj, 'beforeRender'); // Highcharts 6.1+

    const opts = this.getMapNavigationConfig();
    this.updateMapNavigation(opts);

    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateMapNavigation(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateMapNavigation, { enabled: false });
  }

  getMapNavigationConfig = () => {
    const { getHighcharts, children, ...rest } = this.props;
    const Highcharts = getHighcharts();

    return {
      ...(Highcharts.defaultOptions && Highcharts.defaultOptions.mapNavigation),
      ...rest,
      enableButtons: false,
      buttons: {
        zoomIn: {},
        zoomOut: {}
      }
    };
  }

  updateMapNavigation = config => {
    const chart = this.props.getChart();
    chart.update({
      mapNavigation: config
    }, true);
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default MapNavigation;
