import React, { Component } from 'react';
import provideChart from '../ChartProvider';
import providedProps from '../../utils/providedProps';
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
        ['update', 'remove', 'addPlotBand', 'removePlotBand', 'addPlotLine', 'removePlotLine', 'getAxis']
      );
    }

    render () {
      const id = this.props.axisId || this.props.id;
      if (!id) return null;

      const axis = this.props.get(id);
      const update = axis && axis.update.bind(axis);
      const remove = axis && axis.remove.bind(axis);
      const addPlotBand = axis && axis.addPlotBand.bind(axis);
      const removePlotBand = axis && axis.removePlotBand.bind(axis);
      const addPlotLine = axis && axis.addPlotLine.bind(axis);
      const removePlotLine = axis && axis.removePlotLine.bind(axis);
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
          getAxis={getAxis} />
      );
    }
  }

  return provideChart(AxisProvider);
}
