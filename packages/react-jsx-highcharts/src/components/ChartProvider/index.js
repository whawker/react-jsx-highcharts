import React, { Component } from 'react';
import PropTypes from 'prop-types';
import providedProps from '../../utils/providedProps';
import boundContextHelper from '../../utils/boundContextHelper';
import cleanPropsBeforeUpdate from '../../utils/cleanPropsBeforeUpdate';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideChart(WrappedComponent) {
  class ChartProvider extends Component {
    static displayName = `ChartProvider(${getDisplayName(WrappedComponent)})`;

    static contextTypes = {
      chart: PropTypes.object,
      chartType: PropTypes.string
    };

    constructor (props, context) {
      super(props, context);

      providedProps(
        'ChartProvider',
        ['get', 'update', 'addAxis', 'addSeries', 'setTitle', 'getChart', 'getChartType']
      );
    }

    render () {
      const { chart, chartType } = this.context;
      const getChart = () => chart;
      const getChartType = () => chartType;
      const getBoundChartMethod = boundContextHelper(chart, chart);

      return (
        <WrappedComponent
          {...this.props}
          get={chart.get.bind(chart)}
          update={cleanPropsBeforeUpdate(getBoundChartMethod(chart.update))}
          addAxis={cleanPropsBeforeUpdate(getBoundChartMethod(chart.addAxis))}
          addSeries={cleanPropsBeforeUpdate(getBoundChartMethod(chart.addSeries))}
          setTitle={cleanPropsBeforeUpdate(getBoundChartMethod(chart.setTitle))}
          getChart={getChart}
          getChartType={getChartType} />
      );
    }
  }

  return ChartProvider;
}
