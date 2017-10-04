import React from 'react';
import ScatterSeries from '../../../src/components/ScatterSeries/ScatterSeries';
import Series from '../../../src/components/Series';

describe('<ScatterSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<ScatterSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="scatter" />', function () {
    const wrapper = shallow(<ScatterSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('scatter');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<ScatterSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
