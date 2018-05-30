import React from 'react';
import defaultTo from 'lodash/defaultTo';
import DelayRender from '../DelayRender';
import provideChart from '../ChartProvider';
import { Consumer } from '../AxisContext';
import getDisplayName from '../../utils/getDisplayName';
import clean from '../../utils/removeProvidedProps';

// This is a HOC function.
// It takes a component...
export default function provideAxis(Component) {
  // ...and returns another component...
  const AxisWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context axis
    // Notice that we pass through any additional props as well
    const requiresAxis = defaultTo(props.requiresAxis, true);
    return (
      <DelayRender>
        <Consumer>
          {axis => {
            if (!axis && props.axisId) {
              const chart = props.getChart();
              axis = chart.get(props.axisId);
            }

            // Some series (such as Pie and Funnel don't require an axis)
            if (!axis && requiresAxis) return null;

            const getAxis = () => ({
              object: axis,
              id: axis.userOptions && axis.userOptions.id,
              type: axis.coll,
              update: clean(axis.update.bind(axis)),
              remove: axis.remove.bind(axis),
              addPlotBand: clean(axis.addPlotBand.bind(axis)),
              removePlotBand: axis.removePlotBand.bind(axis),
              addPlotLine: clean(axis.addPlotLine.bind(axis)),
              removePlotLine: axis.removePlotLine.bind(axis),
              getExtremes: axis.getExtremes.bind(axis),
              setExtremes: axis.setExtremes.bind(axis),
              setTitle: clean(axis.setTitle.bind(axis))
            })

            return (
              <Component
                {...props}
                getAxis={getAxis} />
            )
          }}
        </Consumer>
      </DelayRender>
    );
  };

  AxisWrappedComponent.displayName = `Axis.Provider(${getDisplayName(Component)})`

  return provideChart(AxisWrappedComponent)
}
