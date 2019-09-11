import React from 'react';
import { BaseChart, HighchartsContext } from 'react-jsx-highcharts';
import { Highcharts, createMockChart } from '../../test-utils';
import HighchartsMapChart from '../../../src/components/HighchartsMapChart/HighchartsMapChart';

describe('<HighchartsMapChart />', () => {
  let testContext;
  let ProvidedHighchartsMapChart;

  beforeEach(() => {
    testContext = {};
    const chart = createMockChart();
    Highcharts.mapChart.mockReturnValue(chart);

    ProvidedHighchartsMapChart = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <HighchartsMapChart {...props} />
      </HighchartsContext.Provider>
    )
  });

  afterEach(() => {
    Highcharts.mapChart.mockRestore()
  });

  it('renders a <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart />);
    expect(wrapper.find(BaseChart)).toExist();
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart />);
     expect(wrapper.find(BaseChart)).toHaveProp('chartCreationFunc',Highcharts.mapChart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart />);
     expect(wrapper.find(BaseChart)).toHaveProp('chartType','mapChart');
  });

  it('renders a <BaseChart /> with GeoJSON from a string', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart map='mock/map' />);
     expect(wrapper.find(BaseChart)).toHaveProp('chart',{ map: { some: 'data' } });
  })

  it('renders a <BaseChart /> with direct GeoJSON', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart map={{ direct: 'input' }} />);
     expect(wrapper.find(BaseChart)).toHaveProp('chart',{ map: { direct: 'input' } });
  })

  it('passes other props through to <BaseChart />', () => {
    const wrapper = mount(<ProvidedHighchartsMapChart plotOptions={{ c: 'd' }} />);
     expect(wrapper.find(BaseChart)).toHaveProp('plotOptions',{ c: 'd' });
  });
});
