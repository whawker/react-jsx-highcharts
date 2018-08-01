import React from 'react';
import WindBarbSeries from '../../../src/components/WindBarbSeries/WindBarbSeries';
import Series from '../../../src/components/Series';

describe('<WindBarbSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<WindBarbSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="windbarb" />', function () {
    const wrapper = shallow(<WindBarbSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('windbarb');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<WindBarbSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
