import React from 'react';
import { Series } from 'react-jsx-highcharts';
import MapBubbleSeries from '../../../src/components/MapBubbleSeries/MapBubbleSeries';

describe('<MapBubbleSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<MapBubbleSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="mapbubble" />', function () {
    const wrapper = shallow(<MapBubbleSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('mapbubble');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<MapBubbleSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
