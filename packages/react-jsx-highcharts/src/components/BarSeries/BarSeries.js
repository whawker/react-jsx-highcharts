import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

class BarSeries extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    update: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    this.props.update({
      chart: {
        inverted: true
      }
    });
  }

  render () {
    return (
      <Series {...this.props} type="bar" />
    );
  }
}

export default BarSeries;
