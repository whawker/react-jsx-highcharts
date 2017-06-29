import React from 'react';
import { shallow } from 'enzyme';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart';
import BaseChart from '../../../src/components/BaseChart';

describe('<HighchartsStockChart />', function ()  {
  it('renders an <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsStockChart />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders an <BaseChart dimension="x" />', function () {
    const wrapper = shallow(<HighchartsStockChart />);
    expect(wrapper).to.have.prop('chartType').equal('stockChart');
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsStockChart plotOptions={{ c: 'd' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ c: 'd' });
  });
});
