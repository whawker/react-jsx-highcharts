import React from 'react';
import BoxPlotSeries from '../../../src/components/BoxPlotSeries/BoxPlotSeries';
import Series from '../../../src/components/Series';

describe('<BoxPlotSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BoxPlotSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="boxplot" />', function () {
    const wrapper = shallow(<BoxPlotSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('boxplot');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BoxPlotSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
