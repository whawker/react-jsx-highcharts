import React from 'react';
import { Series } from 'react-jsx-highcharts';
import OHLCSeries from '../../../src/components/OHLCSeries/OHLCSeries';

describe('<OHLCSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<OHLCSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="ohlc" />', function () {
    const wrapper = shallow(<OHLCSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('ohlc');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<OHLCSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
