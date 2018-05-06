import React from 'react';
import provideAxis from '../AxisProvider'
import { Consumer } from '../SeriesContext';
import getDisplayName from '../../utils/getDisplayName';
import clean from '../../utils/removeProvidedProps';

// This is a HOC function.
// It takes a component...
export default function provideSeries(Component) {
  // ...and returns another component...
  const SeriesWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context series
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {series => {
          if (!series && props.seriesId) {
            const chart = props.getChart();
            series = chart.get(props.seriesId);
          }

          if (!series) return null;

          const getSeries = () => ({
            object: series,
            id: series.userOptions.id,
            update: clean(series.update.bind(series)),
            remove: series.remove.bind(series),
            setData: series.update.bind(series),
            setVisible: series.setVisible.bind(series)
          })

          return (
            <Component {...props} getSeries={getSeries} />
          )
        }}
      </Consumer>
    );
  };

  SeriesWrappedComponent.displayName = `Series.Provider(${getDisplayName(Component)})`

  return provideAxis(SeriesWrappedComponent)
}
