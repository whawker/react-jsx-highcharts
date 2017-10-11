import React from 'react';
import BubbleSeries from '../../../src/components/BubbleSeries/BubbleSeries';
import Series from '../../../src/components/Series';

describe('<BubbleSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BubbleSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bubble" />', function () {
    const wrapper = shallow(<BubbleSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('bubble');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BubbleSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
