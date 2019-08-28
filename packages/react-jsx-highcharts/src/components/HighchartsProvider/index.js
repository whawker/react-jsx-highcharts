import React from 'react';
import memoizeOne from 'memoize-one';
import { Consumer } from '../HighchartsContext';
import getDisplayName from '../../utils/getDisplayName';

// This is a HOC function.
// It takes a component...
export default function provideHighcharts(Component) {

  const createGetHighcharts = memoizeOne(Highcharts => () => Highcharts);

  // ...and returns another component...
  const HighchartsWrappedComponent = function (props) {
    // ... and renders the wrapped component with the context Highcharts global
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {Highcharts => (
          <Component {...props} getHighcharts={createGetHighcharts(Highcharts)} />
        )}
      </Consumer>
    );
  };

  HighchartsWrappedComponent.displayName = `Highcharts.Provider(${getDisplayName(Component)})`

  return HighchartsWrappedComponent;
}
