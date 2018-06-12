import React from 'react';
import GaugeSeries from '../../../src/components/GaugeSeries/GaugeSeries';
import Series from '../../../src/components/Series';

describe('<GaugeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<GaugeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="arearange" />', function () {
    const wrapper = shallow(<GaugeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('gauge');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<GaugeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
