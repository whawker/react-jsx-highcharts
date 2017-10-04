import React from 'react';
import AreaRangeSeries from '../../../src/components/AreaRangeSeries/AreaRangeSeries';
import Series from '../../../src/components/Series';

describe('<AreaRangeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<AreaRangeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="arearange" />', function () {
    const wrapper = shallow(<AreaRangeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('arearange');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<AreaRangeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
