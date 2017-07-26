import React from 'react';
import { shallow } from 'enzyme';
import PyramidSeries from '../../../src/components/PyramidSeries/PyramidSeries';
import Series from '../../../src/components/Series';

describe('<PyramidSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<PyramidSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="pyramid" />', function () {
    const wrapper = shallow(<PyramidSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('pyramid');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<PyramidSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
