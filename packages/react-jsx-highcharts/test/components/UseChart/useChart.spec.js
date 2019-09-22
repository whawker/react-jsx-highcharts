import React from 'react';
import useChart from '../../../src/components/UseChart';
import ChartContext from '../../../src/components/ChartContext'

describe('useChart', () => {
  let ProvidedChartComponent;
  let ChildComponent;
  let testChart;

  beforeEach(() => {
    testChart = {};

    ChildComponent = props => {
      const chart = useChart();
      return (
        <div value={chart} />
      )
    }
    ProvidedChartComponent = props => (
      <ChartContext.Provider value={testChart}>
        <ChildComponent {...props}/>
      </ChartContext.Provider>
    );
  });
  it('should provide Highcharts from context', () => {
    const wrapper = mount(<ProvidedChartComponent />);

    expect(wrapper.find('div')).toHaveProp('value', testChart);
  });
});
