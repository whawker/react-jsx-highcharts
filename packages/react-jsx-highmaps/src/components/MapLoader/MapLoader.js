import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MapLoader extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    renderError: PropTypes.func.isRequired,
    renderLoading: PropTypes.func.isRequired
  };

  static defaultProps = {
    renderError: () => {},
    renderLoading: () => 'Loading…'
  };

  state = {
    data: null,
    error: null
  };

  componentDidMount () {
    this.fetchJSON(this.props.url);
  }

  componentWillUnmount () {
    this.willUnmount = true;
  }

  updateState = state => {
    if (this.willUnmount) return;
    this.setState(state);
  }

  fetchJSON = url => {
    fetch(url)
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(data => {
        this.updateState({ data });
      })
      .catch(error => {
        this.updateState({ error });
      })
  }

  render () {
    const { render, renderError, renderLoading } = this.props;
    const { data, error } = this.state;

    if (data) {
      return render(data);
    } else if (error) {
      return renderError(error);
    } else {
      return renderLoading();
    }
  }
}

export default MapLoader;
