import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import { getModifiedProps } from 'react-jsx-highcharts';
import NavigatorXAxis from './NavigatorXAxis';

class Navigator extends Component {

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
    const { children, getHighcharts, getChart, ...rest } = this.props;

    // Workaround from http://jsfiddle.net/x40me94t/2/
    const Highcharts = getHighcharts();
    const chartObj = getChart().object;
    chartObj.options.navigator.enabled = true;
    Highcharts.fireEvent(chartObj, 'beforeRender');

    this.updateNavigator(rest);

    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateNavigator(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateNavigator, { enabled: false });
  }

  updateNavigator = config => {
    const chart = this.props.getChart();
    chart.update({
      navigator: config
    }, true);
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    const navChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, this.state);
    });

    return (
      <NavigatorXAxis>{navChildren}</NavigatorXAxis>
    );
  }
}

export default Navigator;
