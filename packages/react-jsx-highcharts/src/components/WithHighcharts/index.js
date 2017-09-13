import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function withHighcharts(WrappedComponent, Highcharts) {
  class WithHighcharts extends Component {
    static displayName = `withHighcharts(${getDisplayName(WrappedComponent)})`;

    static childContextTypes = {
      Highcharts: PropTypes.object.isRequired
    };

    getChildContext () {
      return {
        Highcharts
      };
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  return WithHighcharts;
}
