import React from 'react';
import { Consumer } from '../ChartContext';
import provideHighcharts from '../HighchartsProvider'
import getDisplayName from '../../utils/getDisplayName';
import clean from '../../utils/removeProvidedProps';

// This is a HOC function.
// It takes a component...
export default function provideChart(Component) {
  // ...and returns another component...
  const ChartWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context chart
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {({ chart, chartType }) => {
          if (!chart) return null;

          const getChart = () => ({
            object: chart,
            type: chartType,
            get: chart.get.bind(chart),
            update: clean(chart.update.bind(chart)),
            addAxis: clean(chart.addAxis.bind(chart)),
            addSeries: clean(chart.addSeries.bind(chart)),
            setTitle: clean(chart.setTitle.bind(chart)),
            showLoading: chart.showLoading.bind(chart),
            hideLoading: chart.hideLoading.bind(chart)
          })

          return (
            <Component
              {...props}
              getChart={getChart} />
          )
        }}
      </Consumer>
    );
  };

  ChartWrappedComponent.displayName = `Chart.Provider(${getDisplayName(Component)})`

  return provideHighcharts(ChartWrappedComponent)
}
