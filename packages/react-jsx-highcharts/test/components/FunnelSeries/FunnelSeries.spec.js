import React from 'react';
import FunnelSeries from '../../../src/components/FunnelSeries/FunnelSeries';
import Series from '../../../src/components/Series';

describe('<FunnelSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<FunnelSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('does not require an axis', function () {
    const wrapper = shallow(<FunnelSeries id="mySeries" />);
    expect(wrapper).to.have.prop('requiresAxis').equal(false);
  });

  it('renders a <Series type="funnel" />', function () {
    const wrapper = shallow(<FunnelSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('funnel');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<FunnelSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
