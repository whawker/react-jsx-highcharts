import React from 'react';
import { Series } from 'react-jsx-highcharts';
import MapLineSeries from '../../../src/components/MapLineSeries/MapLineSeries';

describe('<MapLineSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<MapLineSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="mapline" />', function () {
    const wrapper = shallow(<MapLineSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('mapline');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<MapLineSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
