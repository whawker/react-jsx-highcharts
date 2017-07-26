import React from 'react';
import { shallow } from 'enzyme';
import BarSeries from '../../../src/components/BarSeries/BarSeries';
import Series from '../../../src/components/Series';

describe('<BarSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BarSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bar" />', function () {
    const wrapper = shallow(<BarSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('bar');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BarSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
