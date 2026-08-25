import * as React from 'react';
import { render } from '@testing-library/react';

import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsChart from '../../../src/components/HighchartsChart/HighchartsChart';
import HighchartsContext from '../../../src/components/HighchartsContext';

describe('<HighchartsChart />', () => {
  let ProvidedHighchartsChart;
  let chart;

  beforeEach(() => {
    chart = createMockChart();
    Highcharts.chart.mockReturnValue(chart);

    ProvidedHighchartsChart = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <HighchartsChart {...props} />
      </HighchartsContext.Provider>
    );
  });

  afterEach(() => {
    Highcharts.chart.mockRestore();
  });

  it('creates a chart', () => {
    render(<ProvidedHighchartsChart />);

    expect(Highcharts.chart).toHaveBeenCalled();
  });

  it('creates chart with the correct chart type', () => {
    render(<ProvidedHighchartsChart />);

    expect(Highcharts.chart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        chartType: 'chart'
      })
    );
  });

  it('passes other props through to chart', () => {
    render(<ProvidedHighchartsChart plotOptions={{ a: 'b' }} />);

    expect(Highcharts.chart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        plotOptions: { a: 'b' }
      })
    );
  });
});
