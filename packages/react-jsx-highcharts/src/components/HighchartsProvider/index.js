import React from 'react';
import getDisplayName from '../../utils/getDisplayName';
import useHighcharts from '../UseHighcharts';

// This is a HOC function.
// It takes a component...
export default function provideHighcharts(Component) {
  // ...and returns another component...
  const HighchartsWrappedComponent = function (props) {
    const getHighcharts = useHighcharts();
    // ... and renders the wrapped component with the context Highcharts global
    // Notice that we pass through any additional props as well
    return (
      <Component {...props} getHighcharts={getHighcharts} />
    );
  };

  HighchartsWrappedComponent.displayName = `Highcharts.Provider(${getDisplayName(Component)})`

  return HighchartsWrappedComponent;
}
