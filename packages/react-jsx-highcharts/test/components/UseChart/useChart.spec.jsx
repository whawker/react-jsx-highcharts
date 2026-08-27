import * as React from 'react';
import { render } from '@testing-library/react';

import { Highcharts } from '../../test-utils';
import ChartContext from '../../../src/components/ChartContext';
import { HighchartsProvider } from '../../../src/components/WithHighcharts';

import ContextSpy from '../../ContextSpy';

describe('useChart', () => {
  let ProvidedChartComponent;
  let testChart;
  let chartRef;

  beforeEach(() => {
    testChart = {};
    chartRef = {};

    ProvidedChartComponent = () => (
      <HighchartsProvider Highcharts={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <ContextSpy chartRef={chartRef} />
        </ChartContext.Provider>
      </HighchartsProvider>
    );
  });
  it('should return chart from context', () => {
    render(<ProvidedChartComponent />);

    expect(chartRef.current).toEqual(testChart);
  });
});
