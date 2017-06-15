import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';

class Debug extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    varName: PropTypes.string.isRequired
  };

  static defaultProps = {
    varName: 'chart'
  };

  componentDidMount () {
    const { varName } = this.props;
    window[varName] = this.context.chart;
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
