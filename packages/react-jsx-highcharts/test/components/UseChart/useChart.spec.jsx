import * as React from 'react';
import { render } from '@testing-library/react';

import ChartContext from '../../../src/components/ChartContext';

import ContextSpy from '../../ContextSpy';

describe('useChart', () => {
  let ProvidedChartComponent;
  let testChart;
  let chartRef;

  beforeEach(() => {
    testChart = {};
    chartRef = {};

    ProvidedChartComponent = () => (
      <ChartContext.Provider value={testChart}>
        <ContextSpy chartRef={chartRef} />
      </ChartContext.Provider>
    );
  });
  it('should return chart from context', () => {
    render(<ProvidedChartComponent />);

    expect(chartRef.current).toEqual(testChart);
  });
});
