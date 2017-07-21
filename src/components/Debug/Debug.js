import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';

class Debug extends Component {

  static propTypes = {
    varName: PropTypes.string.isRequired,
    getChart: PropTypes.func // Provided by ChartProvider
  };

  static defaultProps = {
    varName: 'chart'
  };

  componentDidMount () {
    const { varName, getChart } = this.props;
    window[varName] =  getChart();
    console.log(`Chart instance available as global variable as window.${varName}`);
  }

  componentWillUnmount () {
    window[this.props.varName] = undefined;
  }

  render () {
    return (
      <Hidden />
    );
  }
}

export default Debug;
