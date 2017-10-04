import React from 'react';
import AreaSplineSeries from '../../../src/components/AreaSplineSeries/AreaSplineSeries';
import Series from '../../../src/components/Series';

describe('<AreaSplineSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<AreaSplineSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="areaspline" />', function () {
    const wrapper = shallow(<AreaSplineSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('areaspline');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<AreaSplineSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
