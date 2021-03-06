import * as React from 'react';
import { render } from '@testing-library/react';

jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useHighcharts: jest.fn()
}));

import { useHighcharts, BaseChart } from 'react-jsx-highcharts';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart/HighchartsStockChart';

describe('<HighchartsStockChart />', () => {
  beforeEach(() => {
    const chart = createMockChart();
    Highcharts.stockChart.mockReturnValue(chart);

    useHighcharts.mockImplementation(() => Highcharts);
  });

  it('creates a chart', () => {
    render(<HighchartsStockChart />);

    expect(Highcharts.stockChart).toHaveBeenCalled();
  });

  it('creates a chart with the correct chart type', () => {
    render(<HighchartsStockChart />);

    expect(Highcharts.stockChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        chartType: 'stockChart'
      })
    );
  });

  it('passes other props through to the chart', () => {
    render(<HighchartsStockChart plotOptions={{ c: 'd' }} />);

    expect(Highcharts.stockChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ plotOptions: { c: 'd' } })
    );
  });
});
