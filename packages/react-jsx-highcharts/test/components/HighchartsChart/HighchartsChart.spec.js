import React from 'react';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsChart from '../../../src/components/HighchartsChart/HighchartsChart';
import BaseChart from '../../../src/components/BaseChart';
import { Provider } from '../../../src/components/HighchartsContext';

describe('<HighchartsChart />', () => {
  let ProvidedHighchartsChart;

  beforeEach(() => {
    const chart = createMockChart();
    Highcharts.chart.mockReturnValue(chart);
    const getHighcharts = () => Highcharts;
    ProvidedHighchartsChart = props => (
      <Provider value={getHighcharts}>
        <HighchartsChart {...props}/>
      </Provider>
    );
  });

  afterEach(() => {
    Highcharts.chart.mockRestore()
  });

  it('renders a <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsChart />);
    expect(wrapper.find(BaseChart)).toExist();
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = mount(<ProvidedHighchartsChart />);
    const basechart = wrapper.find(BaseChart);
    expect(basechart).toHaveProp('chartCreationFunc', Highcharts.chart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = mount(<ProvidedHighchartsChart />);
    const basechart = wrapper.find(BaseChart);
    expect(basechart).toHaveProp('chartType', 'chart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsChart plotOptions={{ a: 'b' }} />);
    const basechart = wrapper.find(BaseChart);
    expect(basechart).toHaveProp('plotOptions', { a: 'b' });
  });
});
