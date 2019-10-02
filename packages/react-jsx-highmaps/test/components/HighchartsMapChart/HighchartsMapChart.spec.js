import React from 'react';

jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useHighcharts: jest.fn()
}));

import { useHighcharts, BaseChart } from 'react-jsx-highcharts';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsMapChart from '../../../src/components/HighchartsMapChart/HighchartsMapChart';

describe('<HighchartsMapChart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const chart = createMockChart();
    Highcharts.mapChart.mockReturnValue(chart);
    useHighcharts.mockImplementation(() => Highcharts);
  });

  afterEach(() => {
    Highcharts.mapChart.mockRestore();
  });

  it('renders a <BaseChart />', () => {
    const wrapper = mount(<HighchartsMapChart />);
    expect(wrapper.find(BaseChart)).toExist();
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = mount(<HighchartsMapChart />);
    expect(wrapper.find(BaseChart)).toHaveProp(
      'chartCreationFunc',
      Highcharts.mapChart
    );
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = mount(<HighchartsMapChart />);
    expect(wrapper.find(BaseChart)).toHaveProp('chartType', 'mapChart');
  });

  it('renders a <BaseChart /> with GeoJSON from a string', () => {
    const wrapper = mount(<HighchartsMapChart map="mock/map" />);
    expect(wrapper.find(BaseChart)).toHaveProp('chart', {
      map: { some: 'data' }
    });
  });

  it('renders a <BaseChart /> with direct GeoJSON', () => {
    const wrapper = mount(<HighchartsMapChart map={{ direct: 'input' }} />);
    expect(wrapper.find(BaseChart)).toHaveProp('chart', {
      map: { direct: 'input' }
    });
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = mount(<HighchartsMapChart plotOptions={{ c: 'd' }} />);
    expect(wrapper.find(BaseChart)).toHaveProp('plotOptions', { c: 'd' });
  });
});
