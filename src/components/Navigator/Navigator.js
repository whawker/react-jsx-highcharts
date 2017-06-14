import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import Hidden from '../Hidden';
import getModifiedProps from '../../utils/getModifiedProps';

class Navigator extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };
  
  static propTypes = {
    update: PropTypes.func // Provided by ChartProvider
  };

  constructor (props, context) {
    super(props, context);

    this.updateNavigator = this.updateNavigator.bind(this);
  }

  componentDidMount () {
    const { chart } = this.context;
    const { children, ...rest } = this.props;
    chart.navigator = new Highcharts.Navigator(chart);
    this.updateNavigator({
      ...rest,
      enabled: true
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

  render () {
    const { children } = this.props;
    if (!children) return null;

    return (
      <Hidden>{children}</Hidden>
    );
  }
}

export default Navigator;
