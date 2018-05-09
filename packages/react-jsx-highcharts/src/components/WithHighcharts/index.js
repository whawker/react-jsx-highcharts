import React from 'react';
import { Provider } from '../HighchartsContext';

// This is a HOC function.
// It takes a component...
export default function withHighcharts(Component, Highcharts) {
  // ...and returns another component...
  return function HighchartsWrappedComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Provider value={Highcharts}>
        <Component {...props} />
      </Provider>
    );
  }
}
