import React from 'react';
import HeatmapSeries from '../../../src/components/HeatmapSeries/HeatmapSeries';
import Series from '../../../src/components/Series';

describe('<HeatmapSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<HeatmapSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="heatmap" />', function () {
    const wrapper = shallow(<HeatmapSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('heatmap');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<HeatmapSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
