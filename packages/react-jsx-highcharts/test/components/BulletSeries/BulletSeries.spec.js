import React from 'react';
import BulletSeries from '../../../src/components/BulletSeries/BulletSeries';
import Series from '../../../src/components/Series';

describe('<BulletSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BulletSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bullet" />', function () {
    const wrapper = shallow(<BulletSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('bullet');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BulletSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
