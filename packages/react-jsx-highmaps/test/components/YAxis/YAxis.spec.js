import React from 'react';
import { YAxis } from 'react-jsx-highcharts';
import MapYAxis from '../../../src/components/YAxis';

describe('<YAxis />', () => {
  it('renders a <YAxis />', () => {
    const wrapper = shallow(<MapYAxis />);
    expect(wrapper).to.have.type(YAxis);
  });

  it('should always have the id `yAxis`', () => {
    const wrapper = shallow(<MapYAxis id="customId" />);
    expect(wrapper).to.have.prop('id').equal('yAxis');
  });

  it('should NOT be a dynamic axis', () => {
    const wrapper = shallow(<MapYAxis />);
    expect(wrapper).to.have.prop('dynamicAxis').equal(false);
  });

  it('passes other props through to <YAxis />', () => {
    const wrapper = shallow(<MapYAxis tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });
});
