import React from 'react';
import defaultTo from 'lodash/defaultTo';
import provideChart from '../ChartProvider/index2';
import { Consumer } from '../AxisContext';
import getDisplayName from '../../utils/getDisplayName'

// This is a HOC function.
// It takes a component...
export default function provideAxis(Component) {
  // ...and returns another component...
  const AxisWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {axis => {
          const requiresAxis = defaultTo(props.requiresAxis, true);
          if (!axis && requiresAxis) return null;

          const getAxis = () => ({
            object: axis,
            id: axis.userOptions.id,
            type: axis.coll,
            update: axis.update.bind(axis),
            remove: axis.remove.bind(axis),
            addPlotBand: axis.addPlotBand.bind(axis),
            removePlotBand: axis.removePlotBand.bind(axis),
            getExtremes: axis.getExtremes.bind(axis),
            setExtremes: axis.setExtremes.bind(axis),
            setTitle: axis.setTitle.bind(axis)
          })

          return (
            <Component
              {...props}
              getAxis={getAxis} />
          )
        }}
      </Consumer>
    );
  };

  AxisWrappedComponent.displayName = `Axis.Provider(${getDisplayName(Component)})`

  return provideChart(AxisWrappedComponent)
}
