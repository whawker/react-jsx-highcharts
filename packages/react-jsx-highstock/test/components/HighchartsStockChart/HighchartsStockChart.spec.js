import React from 'react';
import Highcharts from 'highstock-release';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart';
import BaseChart from 'react-jsx-highcharts/src/components/BaseChart';

describe('<HighchartsStockChart />', function ()  {
  it('renders a <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsStockChart />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', function () {
    const wrapper = shallow(<HighchartsStockChart />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.stockChart);
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsStockChart plotOptions={{ c: 'd' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ c: 'd' });
  });
});
