import React from 'react';
import { shallow } from 'enzyme';
import Highcharts from 'highcharts';
import HighchartsChart from '../../../src/components/HighchartsChart';
import BaseChart from '../../../src/components/BaseChart';

describe('<HighchartsChart />', function ()  {
  it('renders a <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsChart />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', function () {
    const wrapper = shallow(<HighchartsChart />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.chart);
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsChart plotOptions={{ a: 'b' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ a: 'b' });
  });
});
