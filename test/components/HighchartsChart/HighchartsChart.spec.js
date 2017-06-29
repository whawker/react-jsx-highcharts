import React from 'react';
import { shallow } from 'enzyme';
import HighchartsChart from '../../../src/components/HighchartsChart';
import BaseChart from '../../../src/components/BaseChart';

describe('<HighchartsChart />', function ()  {
  it('renders an <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsChart />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders an <BaseChart dimension="x" />', function () {
    const wrapper = shallow(<HighchartsChart />);
    expect(wrapper).to.have.prop('chartType').equal('chart');
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsChart plotOptions={{ a: 'b' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ a: 'b' });
  });
});
