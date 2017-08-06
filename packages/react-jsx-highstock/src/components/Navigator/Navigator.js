import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from 'react-jsx-highcharts/src/components/Hidden';
import getModifiedProps from 'react-jsx-highcharts/src/utils/getModifiedProps';

class Navigator extends Component {

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  constructor (props) {
    super(props);

    this.updateNavigator = this.updateNavigator.bind(this);
    this.handleAddSeries = this.handleAddSeries.bind(this);

    this.state = {
      rendered: false,
      seriesCount: 0
    };

    Highcharts.addEvent(props.getChart(), 'addSeries', this.handleAddSeries);
  }

  componentDidMount () {
    const { children, getChart, ...rest } = this.props;
    const chart = getChart();
    chart.navigator = new Highcharts.Navigator(chart);
    this.updateNavigator({
      ...rest
    });
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
    this.updateNavigator({
      enabled: false
    });
  }

  updateNavigator (config) {
    this.props.update({
      navigator: config
    }, true);
  }

  handleAddSeries () {
    this.setState({
      seriesCount: this.state.seriesCount + 1
    });
  }

  render () {
    const { children } = this.props;
    if (!children || !this.state.rendered) return null;

    const navChildren = Children.map(children, child => {
      return cloneElement(child, this.state);
    });

    return (
      <Hidden>{navChildren}</Hidden>
    );
  }
}

export default Navigator;
