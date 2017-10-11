import React from 'react';
import AreaSeries from '../../../src/components/AreaSeries/AreaSeries';
import Series from '../../../src/components/Series';

describe('<AreaSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<AreaSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="area" />', function () {
    const wrapper = shallow(<AreaSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('area');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<AreaSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
