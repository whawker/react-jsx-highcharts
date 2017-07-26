import React from 'react';
import { shallow } from 'enzyme';
import PieSeries from '../../../src/components/PieSeries/PieSeries';
import Series from '../../../src/components/Series';

describe('<PieSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<PieSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="pie" />', function () {
    const wrapper = shallow(<PieSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('pie');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<PieSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
