import React from 'react';
import AreaSplineRangeSeries from '../../../src/components/AreaSplineRangeSeries/AreaSplineRangeSeries';
import Series from '../../../src/components/Series';

describe('<AreaSplineRangeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<AreaSplineRangeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="areasplinerange" />', function () {
    const wrapper = shallow(<AreaSplineRangeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('areasplinerange');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<AreaSplineRangeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
