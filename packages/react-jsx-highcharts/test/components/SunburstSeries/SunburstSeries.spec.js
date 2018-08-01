import React from 'react';
import SunburstSeries from '../../../src/components/SunburstSeries/SunburstSeries';
import Series from '../../../src/components/Series';

describe('<SunburstSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<SunburstSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="sunburst" />', function () {
    const wrapper = shallow(<SunburstSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('sunburst');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<SunburstSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
