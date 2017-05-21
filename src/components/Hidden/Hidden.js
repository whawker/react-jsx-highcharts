import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Hidden extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render () {
    const { children } = this.props;
    if (!children) return null;

    return (
      <script type="text/a-bit-of-a-hack">
        {children}
      </script>
    );
  }
}

export default Hidden;
