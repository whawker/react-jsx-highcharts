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
          'getExtremes', 'setExtremes',
          'setTitle'
        ]
      );
    }

    render () {
      const id = this.props.axisId || this.props.id;
      if (!id) return null;

      const getAxis = () => this.props.get(id);
      const getBoundAxisMethod = boundContextHelper(this.props.getChart(), getAxis);

      const update = getBoundAxisMethod('update');
      const remove = getBoundAxisMethod('remove');
      const addPlotBand = getBoundAxisMethod('addPlotBand');
      const removePlotBand = getBoundAxisMethod('removePlotBand');
      const addPlotLine = getBoundAxisMethod('addPlotLine');
      const removePlotLine = getBoundAxisMethod('removePlotLine');
      const getExtremes = getBoundAxisMethod('getExtremes');
      const setExtremes = getBoundAxisMethod('setExtremes');
      const setTitle = getBoundAxisMethod('setTitle');

      return (
        <WrappedComponent
          {...this.props}
          update={cleanPropsBeforeUpdate(update)}
          remove={remove}
          addPlotBand={cleanPropsBeforeUpdate(addPlotBand)}
          removePlotBand={removePlotBand}
          addPlotLine={cleanPropsBeforeUpdate(addPlotLine)}
          removePlotLine={removePlotLine}
          getExtremes={getExtremes}
          setExtremes={setExtremes}
          setTitle={cleanPropsBeforeUpdate(setTitle)}
          getAxis={getAxis} />
      );
    }
  }

  return provideChart(AxisProvider);
}
