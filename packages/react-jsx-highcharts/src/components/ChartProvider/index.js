import React from 'react';
import { Consumer } from '../ChartContext';
import provideHighcharts from '../HighchartsProvider'
import getDisplayName from '../../utils/getDisplayName';

// This is a HOC function.
// It takes a component...
export default function provideChart(Component) {
  // ...and returns another component...
  const ChartWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context chart
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {({ getChart, needsRedraw }) => {
          if (!getChart) return null;

          return (
            <Component
              {...props}
              getChart={getChart}
              needsRedraw={needsRedraw} />
          )
        }}
      </Consumer>
    );
  };

  ChartWrappedComponent.displayName = `Chart.Provider(${getDisplayName(Component)})`

  return provideHighcharts(ChartWrappedComponent)
}
