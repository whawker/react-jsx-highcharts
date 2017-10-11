import React from 'react';
import TreemapSeries from '../../../src/components/TreemapSeries/TreemapSeries';
import Series from '../../../src/components/Series';

describe('<TreemapSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<TreemapSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="treemap" />', function () {
    const wrapper = shallow(<TreemapSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('treemap');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<TreemapSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
