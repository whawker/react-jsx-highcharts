import * as React from 'react';
import { render } from '@testing-library/react';

jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useHighcharts: jest.fn()
}));

import { useHighcharts } from 'react-jsx-highcharts';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsMapChart from '../../../src/components/HighchartsMapChart/HighchartsMapChart';

describe('<HighchartsMapChart />', () => {
  let chart;

  beforeEach(() => {
    chart = createMockChart();
    Highcharts.mapChart.mockReturnValue(chart);
    useHighcharts.mockImplementation(() => Highcharts);
  });

  afterEach(() => {
    Highcharts.mapChart.mockRestore();
  });

  it('creates a chart', () => {
    render(<HighchartsMapChart />);

    expect(Highcharts.mapChart).toHaveBeenCalled();
  });

  it('creates a chart with the correct chart type', () => {
    render(<HighchartsMapChart />);

    expect(Highcharts.mapChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        chartType: 'mapChart'
      })
    );
  });

  it('creates a chart with GeoJSON from a string', () => {
    render(<HighchartsMapChart map="mock/map" />);

    expect(Highcharts.mapChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        chart: expect.objectContaining({ map: { some: 'data' } })
      })
    );
  });

  it('creates a chart with direct GeoJSON', () => {
    render(<HighchartsMapChart map={{ direct: 'input' }} />);

    expect(Highcharts.mapChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        chart: expect.objectContaining({ map: { direct: 'input' } })
      })
    );
  });

  it('passes other props through to chart', () => {
    render(<HighchartsMapChart plotOptions={{ c: 'd' }} />);

    expect(Highcharts.mapChart).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ plotOptions: { c: 'd' } })
    );
  });

  it('return a chart instance to the callback prop', () => {
    let cbChart;
    const chartCallback = returnedChart => {
      cbChart = returnedChart;
    };
    render(<HighchartsMapChart callback={chartCallback} />);
    expect(cbChart).toBeDefined();
  });
});
