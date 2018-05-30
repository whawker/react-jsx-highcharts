import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Hidden extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render () {
    const { children } = this.props;
    if (!children) return null;

    return [
      children
    ];
  }
}

export default Hidden;
