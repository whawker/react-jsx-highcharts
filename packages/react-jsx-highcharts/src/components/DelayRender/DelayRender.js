import React, { Component } from 'react';

class DelayRender extends Component {
  state = {
    render: false
  }
  renderTimeout = null;

  componentDidMount () {
    this.renderTimeout = window.setTimeout(() => {
      this.setState({
        render: true
      });
      this.renderTimeout = null;
    }, 1);
  }
  componentWillUnmount() {
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
