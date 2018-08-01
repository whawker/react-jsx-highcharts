import React from 'react';
import XRangeSeries from '../../../src/components/XRangeSeries/XRangeSeries';
import Series from '../../../src/components/Series';

describe('<XRangeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<XRangeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="xrange" />', function () {
    const wrapper = shallow(<XRangeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('xrange');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<XRangeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
