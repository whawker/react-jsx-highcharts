import React from 'react';
import { shallow } from 'enzyme';
import FlagSeries from '../../../src/components/FlagSeries/FlagSeries';
import Series from '../../../src/components/Series';

describe('<FlagSeries />', function ()  {
  it('renders an <Series />', function ()  {
    const wrapper = shallow(<FlagSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders an <Series type="flag" />', function () {
    const wrapper = shallow(<FlagSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('flag');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<FlagSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
