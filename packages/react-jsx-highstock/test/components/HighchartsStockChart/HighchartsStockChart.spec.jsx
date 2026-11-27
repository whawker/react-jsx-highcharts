import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

import Highstock from 'highcharts/highstock';
import { HighchartsProvider } from 'react-jsx-highcharts';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart/HighchartsStockChart';
import ContextSpy from '../../ContextSpy';

describe('<HighchartsStockChart />', () => {
  let chartRef;
  let StockChart;
  beforeEach(() => {
    chartRef = { current: null };
    StockChart = props => (
      <HighchartsProvider Highcharts={Highstock}>
        <HighchartsStockChart {...props}>
          <ContextSpy chartRef={chartRef} />
        </HighchartsStockChart>
      </HighchartsProvider>
    );
  });

  it('creates a chart with the correct chart type', () => {
    render(<StockChart />);

    expect(chartRef.current.type).toBe('stockChart');
  });

  it('passes other props through to the chart', () => {
    const plotOptions = { line: { animation: false } };

    render(<StockChart plotOptions={plotOptions} />);

    expect(chartRef.current.object.userOptions.plotOptions).toEqual(
      plotOptions
    );
  });
});
