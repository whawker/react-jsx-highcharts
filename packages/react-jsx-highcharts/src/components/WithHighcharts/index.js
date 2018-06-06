import React, { Component } from 'react';
import each from 'lodash/each';
import get from 'lodash/get';
import set from 'lodash/set';
import wrap from 'lodash/wrap';
import { Provider } from '../HighchartsContext';

// This is a HOC function.
// It takes a component...
export default function withHighcharts(WrappedComponent, Highcharts, overrides = {}) {
  // ...and returns another component...
  // return function HighchartsWrappedComponent(props) {
  //   // ... and renders the wrapped component with the context theme!
  //   // Notice that we pass through any additional props as well
  //   return (
  //     <Provider value={Highcharts}>
  //       <Component {...props} />
  //     </Provider>
  //   );
  // }

  class HighchartsWrappedComponent extends Component {
    componentDidMount () {
      const originalFunctions = {};

      each(overrides, function (func, path) {
        originalFunctions[path] = get(Highcharts, path); // Store original function for restoring later

        const wrapped = wrap(originalFunctions[path], func);
        set(Highcharts, path, wrapped);
      });

      this.originalFunctions = originalFunctions;
    }

    componentWillUnmount () {
      const originalFunctions = this.originalFunctions;

      each(overrides, function (func, path) {
        set(Highcharts, path, originalFunctions[path]);
      });

      this.originalFunctions = {};
    }

    render () {
      return (
        <Provider value={Highcharts}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  }

  return HighchartsWrappedComponent;
}
