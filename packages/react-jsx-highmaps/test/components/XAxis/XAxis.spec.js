import React from 'react';
import { XAxis } from 'react-jsx-highcharts';
import MapXAxis from '../../../src/components/XAxis';

describe('<XAxis />', () => {
  it('renders an <XAxis />', () => {
    const wrapper = shallow(<MapXAxis />);
    expect(wrapper.type()).toEqual(XAxis);
  });

  it('should always have the id `xAxis`', () => {
    const wrapper = shallow(<MapXAxis id="customId" />);
    expect(wrapper).toHaveProp('id', 'xAxis');
  });

  it('should NOT be a dynamic axis', () => {
    const wrapper = shallow(<MapXAxis />);
    expect(wrapper).toHaveProp('dynamicAxis', false);
  });

  it('passes other props through to <XAxis />', () => {
    const wrapper = shallow(<MapXAxis tickLength={1337} />);
    expect(wrapper).toHaveProp('tickLength', 1337);
  });
});
