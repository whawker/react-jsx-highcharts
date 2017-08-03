import React, { Component } from 'react';
import provideChart from '../ChartProvider';
import providedProps from '../../utils/providedProps';
import getBoundChartMethod from '../../utils/getBoundChartMethod';
import cleanPropsBeforeUpdate from '../../utils/cleanPropsBeforeUpdate';

function getDisplayName (Component) {
  return Component.displayName || Component.name || 'Component';
}

export default function provideAxis(WrappedComponent) {
  class AxisProvider extends Component {
    static displayName = `AxisProvider(${getDisplayName(WrappedComponent)})`;

    constructor (props, context) {
      super(props, context);

      providedProps(
        'AxisProvider',
        [
          'update', 'remove', 'getAxis',
          'addPlotBand', 'removePlotBand',
          'addPlotLine', 'removePlotLine',
          'getExtremes', 'setExtremes'
        ]
      );
    }

    render () {
      const id = this.props.axisId || this.props.id;
      if (!id) return null;

      const chart = this.props.getChart();
      const axis = this.props.get(id);
      const update = axis && getBoundChartMethod(chart, axis.update, axis);
      const remove = axis && getBoundChartMethod(chart, axis.remove, axis);
      const addPlotBand = axis && getBoundChartMethod(chart, axis.addPlotBand, axis);
      const removePlotBand = axis && getBoundChartMethod(chart, axis.removePlotBand, axis);
      const addPlotLine = axis && getBoundChartMethod(chart, axis.addPlotLine, axis);
      const removePlotLine = axis && getBoundChartMethod(chart, axis.removePlotLine, axis);
      const getExtremes = axis && getBoundChartMethod(chart, axis.getExtremes, axis);
      const setExtremes = axis && getBoundChartMethod(chart, axis.setExtremes, axis);
      const getAxis = () => this.props.get(id);

      return (
        <WrappedComponent
          {...this.props}
          update={cleanPropsBeforeUpdate(update)}
          remove={remove}
          addPlotBand={cleanPropsBeforeUpdate(addPlotBand)}
          removePlotBand={cleanPropsBeforeUpdate(removePlotBand)}
          addPlotLine={cleanPropsBeforeUpdate(addPlotLine)}
          removePlotLine={cleanPropsBeforeUpdate(removePlotLine)}
          getExtremes={getExtremes}
          setExtremes={setExtremes}
          getAxis={getAxis} />
      );
    }
  }

  return provideChart(AxisProvider);
}
