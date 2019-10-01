import React from 'react';

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

  it('renders a <BaseChart />', () => {
    const wrapper = mount(<HighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toExist();
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = mount(<HighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toHaveProp(
      'chartCreationFunc',
      Highcharts.stockChart
    );
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = mount(<HighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toHaveProp('chartType', 'stockChart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = mount(<HighchartsStockChart plotOptions={{ c: 'd' }} />);
    expect(wrapper.find(BaseChart)).toHaveProp('plotOptions', { c: 'd' });
  });
});
