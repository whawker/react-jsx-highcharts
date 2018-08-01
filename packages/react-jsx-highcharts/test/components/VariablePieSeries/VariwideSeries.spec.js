import React from 'react';
import VariwideSeries from '../../../src/components/VariwideSeries/VariwideSeries';
import Series from '../../../src/components/Series';

describe('<VariwideSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<VariwideSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="variwide" />', function () {
    const wrapper = shallow(<VariwideSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('variwide');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<VariwideSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
