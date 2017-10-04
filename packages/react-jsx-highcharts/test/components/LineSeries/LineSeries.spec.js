import React from 'react';
import LineSeries from '../../../src/components/LineSeries/LineSeries';
import Series from '../../../src/components/Series';

describe('<LineSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<LineSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="line" />', function () {
    const wrapper = shallow(<LineSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('line');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<LineSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
