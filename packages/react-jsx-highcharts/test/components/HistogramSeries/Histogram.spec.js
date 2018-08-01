import React from 'react';
import HistogramSeries from '../../../src/components/HistogramSeries/HistogramSeries';
import Series from '../../../src/components/Series';

describe('<HistogramSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<HistogramSeries baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="histogram" />', function () {
    const wrapper = shallow(<HistogramSeries id="mySeries" baseSeries="myBaseSeries" />);
    expect(wrapper).to.have.prop('type').equal('histogram');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<HistogramSeries baseSeries="myBaseSeries" zIndex={-1} />);
    expect(wrapper).to.have.prop('zIndex').eql(-1);
  });
});
