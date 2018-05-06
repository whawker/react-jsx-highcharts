import React from 'react';
import { Consumer } from '../ChartContext';
import provideHighcharts from '../HighchartsProvider/index2'
import getDisplayName from '../../utils/getDisplayName'

// This is a HOC function.
// It takes a component...
export default function provideChart(Component) {
  // ...and returns another component...
  const ChartWrappedComponent = function(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <Consumer>
        {({ chart, chartType }) => {
          if (!chart) return null;

          const getChart = () => ({
            object: chart,
            get: chart.get.bind(chart),
            update: chart.update.bind(chart),
            addAxis: chart.addAxis.bind(chart),
            addSeries: chart.addSeries.bind(chart),
            setTitle: chart.setTitle.bind(chart),
            showLoading: chart.showLoading.bind(chart),
            hideLoading: chart.hideLoading.bind(chart),
            getType: () => chartType
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
