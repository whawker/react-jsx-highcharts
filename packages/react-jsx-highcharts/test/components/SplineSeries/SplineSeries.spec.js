import React from 'react';
import SplineSeries from '../../../src/components/SplineSeries/SplineSeries';
import Series from '../../../src/components/Series';

describe('<SplineSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<SplineSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="spline" />', function () {
    const wrapper = shallow(<SplineSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('spline');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<SplineSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
