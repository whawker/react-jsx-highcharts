import React from 'react';
import { BaseChart } from 'react-jsx-highcharts';
import { Highcharts } from '../../test-utils';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart/HighchartsStockChart';

describe('<HighchartsStockChart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', () => {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper.type()).toBe(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper).toHaveProp('chartCreationFunc', Highcharts.stockChart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper).toHaveProp('chartType', 'stockChart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={testContext.getHighcharts} plotOptions={{ c: 'd' }} />);
    expect(wrapper).toHaveProp('plotOptions',{ c: 'd' });
  });
});
