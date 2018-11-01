import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired,
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

  render () {
    return this.props.children;
  }
}

export default Marker;
