import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pathfinder extends Component {

  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    dashStyle: PropTypes.string(),
    lineWidth: PropTypes.number()
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

export default Pathfinder;
