import React, { Component } from 'react';

class DelayRender extends Component {
  state = {
    render: false
  };

  renderTimeout = null;

  componentDidMount () {
    this.renderTimeout = window.requestAnimationFrame(() => {
      this.setState({ render: true });
      this.renderTimeout = null;
    });
  }

  componentWillUnmount() {
    if(this.renderTimeout !== null) {
      window.cancelAnimationFrame(this.renderTimeout);
    }
  }

  render () {
    if (!this.state.render) return null;

    return this.props.children;
  }
}

export default DelayRender;
