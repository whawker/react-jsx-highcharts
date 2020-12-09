import * as React from 'react';
import { render } from '@testing-library/react';

import useSeries from '../../../src/components/UseSeries';
import SeriesContext from '../../../src/components/SeriesContext';
import ChartContext from '../../../src/components/ChartContext';
import { createMockSeries } from '../../test-utils';
import * as createProvidedSeries from '../../../src/components/Series/createProvidedSeries';

describe('useSeries', () => {
  let ChildComponent;
  let testSeries;
  let testChart;
  let seriesCallback;

  beforeEach(() => {
    jest.useFakeTimers();
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(cb => window.setTimeout(cb, 0));
    jest.spyOn(window, 'cancelAnimationFrame');

    testSeries = createMockSeries();

    testChart = {
      get: jest.fn().mockImplementation(() => testSeries)
    };
    seriesCallback = jest.fn();

    jest.spyOn(createProvidedSeries, 'default').mockImplementation(c => c);

    ChildComponent = props => {
      const axis = useSeries(props.seriesId);
      seriesCallback(axis);
      return null;
    };
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    window.cancelAnimationFrame.mockRestore();
    jest.clearAllTimers();
  });

  it('should return series from context', () => {
    const wrapper = render(
      <SeriesContext.Provider value={testSeries}>
        <ChildComponent />
      </SeriesContext.Provider>
    );

    expect(seriesCallback).toHaveBeenCalledWith(testSeries);
  });

  it('should return series outside the context', () => {
    const wrapper = render(
      <ChartContext.Provider value={testChart}>
        <ChildComponent seriesId="mySeriesId" />
      </ChartContext.Provider>
    );

    expect(testChart.get).toHaveBeenCalledWith('mySeriesId');
    expect(seriesCallback).toHaveBeenCalledWith(testSeries);
  });
});
