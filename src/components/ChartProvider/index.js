import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideChart(WrappedComponent) {
  class ChartProvider extends Component {
    static displayName = `ChartProvider(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      chart: PropTypes.object
    };

    render () {
      const chart = this.context.chart;

      return (
        <WrappedComponent
          {...this.props}
          get={chart.get.bind(chart)}
          update={chart.update.bind(chart)}
          addAxis={chart.addAxis.bind(chart)}
          addSeries={chart.addSeries.bind(chart)} />
      );
    }
  }

  return ChartProvider;
}
