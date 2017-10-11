import React from 'react';
import ErrorBarSeries from '../../../src/components/ErrorBarSeries/ErrorBarSeries';
import Series from '../../../src/components/Series';

describe('<ErrorBarSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<ErrorBarSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="errorbar" />', function () {
    const wrapper = shallow(<ErrorBarSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('errorbar');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<ErrorBarSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
