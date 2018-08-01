import React from 'react';
import ParetoSeries from '../../../src/components/ParetoSeries/ParetoSeries';
import Series from '../../../src/components/Series';

describe('<ParetoSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<ParetoSeries baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="pareto" />', function () {
    const wrapper = shallow(<ParetoSeries id="mySeries" baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.prop('type').equal('pareto');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<ParetoSeries baseSeries="myBaseSeries" zIndex={-1} />);
    expect(wrapper).to.have.prop('zIndex').eql(-1);
  });
});
