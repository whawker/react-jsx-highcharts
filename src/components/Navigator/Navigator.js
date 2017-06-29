import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class Navigator extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    update: PropTypes.func, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  constructor (props, context) {
    super(props, context);

    this.updateNavigator = this.updateNavigator.bind(this);
    this.handleAddSeries = this.handleAddSeries.bind(this);

    this.state = {
      seriesCount: 0
    };

    Highcharts.addEvent(context.chart, 'addSeries', this.handleAddSeries);
  }

  componentDidMount () {
    const { chart } = this.context;
    const { children, ...rest } = this.props;
    chart.navigator = new Highcharts.Navigator(chart);
    this.updateNavigator({
      ...rest
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
    if (!children) return null;

    const navChildren = Children.map(children, child => {
      return cloneElement(child, this.state);
    });

    return (
      <Hidden>{navChildren}</Hidden>
    );
  }
}

export default Navigator;
