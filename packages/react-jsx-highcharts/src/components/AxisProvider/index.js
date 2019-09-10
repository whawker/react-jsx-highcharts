import React from 'react';
import memoizeOne from 'memoize-one';
import DelayRender from '../DelayRender';
import { Consumer } from '../AxisContext';
import getDisplayName from '../../utils/getDisplayName';
import clean from '../../utils/removeProvidedProps';
import useChart from '../UseChart';

// This is a HOC function.
// It takes a component...
export default function provideAxis(Component) {

  const createGetAxis = memoizeOne(axis => () => {
    if(!axis) return null;

    return {
      object: axis,
      id: axis.userOptions && axis.userOptions.id,
      type: axis.coll,
      update: clean(axis.update.bind(axis)),
      remove: axis.remove.bind(axis),
      addPlotBandOrLine: clean(axis.addPlotBandOrLine.bind(axis)),
      removePlotBandOrLine: axis.removePlotBandOrLine.bind(axis),
      getExtremes: axis.getExtremes.bind(axis),
      setExtremes: axis.setExtremes.bind(axis),
      setTitle: clean(axis.setTitle.bind(axis))
    }
  });

  // ...and returns another component...
  const AxisWrappedComponent = function(props) {
    const { getChart } = useChart();
    // ... and renders the wrapped component with the context axis
    // Notice that we pass through any additional props as well
    return (
      <DelayRender>
        <Consumer>
          {axis => {
            if (!axis && props.axisId) {
              const chart = getChart();
              axis = chart.get(props.axisId);
            }

            const getAxis = createGetAxis(axis);

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

  return AxisWrappedComponent;
}
