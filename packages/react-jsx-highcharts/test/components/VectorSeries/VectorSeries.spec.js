import React from 'react';
import VectorSeries from '../../../src/components/VectorSeries/VectorSeries';
import Series from '../../../src/components/Series';

describe('<VectorSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<VectorSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="vector" />', function () {
    const wrapper = shallow(<VectorSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('vector');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<VectorSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
