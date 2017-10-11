import React from 'react';
import WaterfallSeries from '../../../src/components/WaterfallSeries/WaterfallSeries';
import Series from '../../../src/components/Series';

describe('<WaterfallSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<WaterfallSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="waterfall" />', function () {
    const wrapper = shallow(<WaterfallSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('waterfall');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<WaterfallSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
