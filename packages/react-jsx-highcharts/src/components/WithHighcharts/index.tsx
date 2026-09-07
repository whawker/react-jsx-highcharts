import * as React from 'react';
import HighchartsContext from '../HighchartsContext';

import type * as HC from 'highcharts';
import type { ReactNode, ComponentType, JSX } from 'react';

/**
 * Provides HighchartsContext to component.
 * @deprecated use &lt;HighchartsProvider&gt; instead
 * @see {@link HighchartsProvider}
 */
export default function withHighcharts<P extends JSX.IntrinsicAttributes>(
  Component: ComponentType<P>,
  Highcharts: typeof HC
) {
  // ...and returns another component...
  return function HighchartsWrappedComponent(props: P) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <HighchartsProvider Highcharts={Highcharts}>
        <Component {...props} />
      </HighchartsProvider>
    );
  };
}

export const HighchartsProvider = ({
  Highcharts,
  children
}: {
  Highcharts: typeof HC;
  children: ReactNode;
}) => (
  <HighchartsContext.Provider value={Highcharts}>
    {children}
  </HighchartsContext.Provider>
);
