import React, { Component } from 'react';

class DelayRender extends Component {
  state = {
    render: false
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.setState({
        render: true
      })
    }, 1);
  }
  render () {
    if (!this.state.render) return null;

    return this.props.children;
  }
}

export default DelayRender;
