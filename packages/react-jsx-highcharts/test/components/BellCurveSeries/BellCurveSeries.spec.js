import React from 'react';
import BellCurveSeries from '../../../src/components/BellCurveSeries/BellCurveSeries';
import Series from '../../../src/components/Series';

describe('<BellCurveSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BellCurveSeries baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bellcurve" />', function () {
    const wrapper = shallow(<BellCurveSeries id="mySeries" baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.prop('type').equal('bellcurve');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BellCurveSeries baseSeries="myBaseSeries" zIndex={-1} />);
    expect(wrapper).to.have.prop('zIndex').eql(-1);
  });
});
