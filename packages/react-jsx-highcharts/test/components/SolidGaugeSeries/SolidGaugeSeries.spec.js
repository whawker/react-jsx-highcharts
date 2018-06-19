import React from 'react';
import SolidGaugeSeries from '../../../src/components/SolidGaugeSeries/SolidGaugeSeries';
import Series from '../../../src/components/Series';

describe('<SolidGaugeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<SolidGaugeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="arearange" />', function () {
    const wrapper = shallow(<SolidGaugeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('solidgauge');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<SolidGaugeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
