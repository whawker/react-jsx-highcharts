import * as React from 'react';
import { render } from '@testing-library/react';

vi.mock('react-jsx-highcharts', async () => {
  const originalModule = await vi.importActual('react-jsx-highcharts');

  return {
    ...originalModule,
    useHighcharts: vi.fn()
  };
});

import { useHighcharts } from 'react-jsx-highcharts';
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
