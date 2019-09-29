import React from 'react';
import { BaseChart, HighchartsContext } from 'react-jsx-highcharts';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart/HighchartsStockChart';

describe('<HighchartsStockChart />', () => {
  let ProvidedHighchartsStockChart;

  beforeEach(() => {
    const chart = createMockChart();
    Highcharts.stockChart.mockReturnValue(chart);

    ProvidedHighchartsStockChart = props => (
      <HighchartsContext.Provider value={ Highcharts }>
        <HighchartsStockChart {...props} />
      </HighchartsContext.Provider>
    )
  });

  it('renders a <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toExist();
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = mount(<ProvidedHighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toHaveProp('chartCreationFunc', Highcharts.stockChart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = mount(<ProvidedHighchartsStockChart />);
    expect(wrapper.find(BaseChart)).toHaveProp('chartType', 'stockChart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsStockChart plotOptions={{ c: 'd' }} />);
    expect(wrapper.find(BaseChart)).toHaveProp('plotOptions',{ c: 'd' });
  });
});
