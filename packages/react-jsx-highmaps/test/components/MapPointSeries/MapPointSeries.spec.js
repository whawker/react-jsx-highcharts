import React from 'react';
import { Series } from 'react-jsx-highcharts';
import MapPointSeries from '../../../src/components/MapPointSeries/MapPointSeries';

describe('<MapPointSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<MapPointSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="mappoint" />', function () {
    const wrapper = shallow(<MapPointSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('mappoint');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<MapPointSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
