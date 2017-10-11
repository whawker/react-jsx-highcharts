import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Hidden extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render () {
    const { children } = this.props;
    if (!children) return null;

    if (React.version >= '16.0.0') {
      return [
        children
      ];
    }

    return (
      <div style={{ display: 'none' }}>
        {children}
      </div>
    );
  }
}

export default Hidden;
