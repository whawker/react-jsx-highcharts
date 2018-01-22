import React from 'react';
import StreamGraphSeries from '../../../src/components/StreamGraphSeries/StreamGraphSeries';
import Series from '../../../src/components/Series';

describe('<StreamGraphSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<StreamGraphSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="streamgraph" />', function () {
    const wrapper = shallow(<StreamGraphSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('streamgraph');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<StreamGraphSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
