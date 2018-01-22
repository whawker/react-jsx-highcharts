import React from 'react';
import SankeySeries from '../../../src/components/SankeySeries/SankeySeries';
import Series from '../../../src/components/Series';

describe('<SankeySeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<SankeySeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="sankey" />', function () {
    const wrapper = shallow(<SankeySeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('sankey');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<SankeySeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
