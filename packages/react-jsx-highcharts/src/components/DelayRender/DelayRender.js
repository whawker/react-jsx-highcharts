import React, { Component } from 'react';

class DelayRender extends Component {
  state = {
    render: false
  }

  unmounted = false;

  renderTimeout = null;

  componentDidMount () {
    this.renderTimeout = window.setTimeout(() => {
      if (this.unmounted) return;
      this.setState({ render: true });
      this.renderTimeout = null;
    }, 1);
  }

  componentWillUnmount () {
    this.unmounted = true;
    if(this.renderTimeout !== null) {
      window.clearTimeout(this.renderTimeout);
    }
  }
  render () {
    if (!this.state.render) return null;

    return this.props.children;
  }
}

export default DelayRender;
