import React from 'react';
import { Series } from 'react-jsx-highcharts';
import FlagSeries from '../../../src/components/FlagSeries/FlagSeries';

describe('<FlagSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<FlagSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="flags" />', function () {
    const wrapper = shallow(<FlagSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('flags');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<FlagSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
