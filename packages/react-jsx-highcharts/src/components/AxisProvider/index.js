import React, { Component } from 'react';
import provideChart from '../ChartProvider';
import providedProps from '../../utils/providedProps';
import boundContextHelper from '../../utils/boundContextHelper';
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

      const axis = this.props.get(id);

      const getBoundAxisMethod = boundContextHelper(this.props.getChart(), axis);

      const update = getBoundAxisMethod(axis && axis.update);
      const remove = getBoundAxisMethod(axis && axis.remove);
      const addPlotBand = getBoundAxisMethod(axis && axis.addPlotBand);
      const removePlotBand = getBoundAxisMethod(axis && axis.removePlotBand);
      const addPlotLine = getBoundAxisMethod(axis && axis.addPlotLine);
      const removePlotLine = getBoundAxisMethod(axis && axis.removePlotLine);
      const getExtremes = getBoundAxisMethod(axis && axis.getExtremes);
      const setExtremes = getBoundAxisMethod(axis && axis.setExtremes);
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
