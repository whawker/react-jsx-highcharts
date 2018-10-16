import React from 'react';
import { Series } from 'react-jsx-highcharts';
import MapSeries from '../../../src/components/MapSeries/MapSeries';

describe('<MapSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<MapSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="map" />', function () {
    const wrapper = shallow(<MapSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('map');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<MapSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
