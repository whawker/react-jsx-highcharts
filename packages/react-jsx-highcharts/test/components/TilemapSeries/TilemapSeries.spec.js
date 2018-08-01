import React from 'react';
import TilemapSeries from '../../../src/components/TilemapSeries/TilemapSeries';
import Series from '../../../src/components/Series';

describe('<TilemapSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<TilemapSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="tilemap" />', function () {
    const wrapper = shallow(<TilemapSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('tilemap');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<TilemapSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
