import * as React from 'react';
import { render } from '@testing-library/react';

import useSeries from '../../../src/components/UseSeries';
import SeriesContext from '../../../src/components/SeriesContext';
import ChartContext from '../../../src/components/ChartContext';
import { HighchartsProvider } from '../../../src/components/WithHighcharts';
import { createMockSeries, Highcharts } from '../../test-utils';
import * as createProvidedSeries from '../../../src/components/Series/createProvidedSeries';

describe('useSeries', () => {
  let ChildComponent;
  let testSeries;
  let testChart;
  let seriesCallback;

  beforeEach(() => {
    vi.useFakeTimers();

    testSeries = createMockSeries();

    testChart = {
      get: vi.fn().mockImplementation(() => testSeries)
    };
    seriesCallback = vi.fn();

    vi.spyOn(createProvidedSeries, 'default').mockImplementation(c => c);

    ChildComponent = props => {
      const axis = useSeries(props.seriesId);
      seriesCallback(axis);
      return null;
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('should return series from context', () => {
    render(
      <HighchartsProvider value={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <SeriesContext.Provider value={testSeries}>
            <ChildComponent />
          </SeriesContext.Provider>
        </ChartContext.Provider>
      </HighchartsProvider>
    );

    expect(seriesCallback).toHaveBeenCalledWith(testSeries);
  });

  it('should return series outside the context', () => {
    render(
      <HighchartsProvider value={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <ChildComponent seriesId="mySeriesId" />
        </ChartContext.Provider>
      </HighchartsProvider>
    );

    expect(testChart.get).toHaveBeenCalledWith('mySeriesId');
    expect(seriesCallback).toHaveBeenCalledWith(testSeries);
  });
});
