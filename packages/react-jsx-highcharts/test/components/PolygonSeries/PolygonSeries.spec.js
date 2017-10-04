import React from 'react';
import PolygonSeries from '../../../src/components/PolygonSeries/PolygonSeries';
import Series from '../../../src/components/Series';

describe('<PolygonSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<PolygonSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="polygon" />', function () {
    const wrapper = shallow(<PolygonSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('polygon');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<PolygonSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
