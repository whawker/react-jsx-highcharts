import React, { Component } from 'react';

class DelayRender extends Component {
  state = {
    render: false
  };

  renderTimeout = null;

  unmounted = false;

  componentDidMount () {
    this.renderTimeout = window.requestAnimationFrame(() => {
      if (this.unmounted === false) {
        this.setState({ render: true });
      }
      this.renderTimeout = null;
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
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
