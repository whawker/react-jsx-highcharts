import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideHighcharts from '../HighchartsProvider';
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
        [
          'get', 'update', 'addAxis', 'addSeries',
          'setTitle', 'showLoading', 'hideLoading',
          'getChart', 'getChartType'
        ]
      );
    }

    render () {
      const { chart, chartType } = this.context;
      const getChart = () => chart;
      const getChartType = () => chartType;
      const getBoundChartMethod = boundContextHelper(chart, getChart);

      return (
        <WrappedComponent
          {...this.props}
          get={getBoundChartMethod('get')}
          update={cleanPropsBeforeUpdate(getBoundChartMethod('update'))}
          addAxis={cleanPropsBeforeUpdate(getBoundChartMethod('addAxis'))}
          addSeries={cleanPropsBeforeUpdate(getBoundChartMethod('addSeries'))}
          setTitle={cleanPropsBeforeUpdate(getBoundChartMethod('setTitle'))}
          showLoading={getBoundChartMethod('showLoading')}
          hideLoading={getBoundChartMethod('hideLoading')}
          getChart={getChart}
          getChartType={getChartType} />
      );
    }
  }

  return provideHighcharts(ChartProvider);
}
