import React from 'react';
import YAxis from '../../../src/components/YAxis/YAxis';
import Axis from '../../../src/components/Axis';

describe('<YAxis />', () => {
  it('renders an <Axis />', () => {
    const wrapper = shallow(<YAxis id="y" />);
    expect(wrapper.type()).toBe(Axis);
  });

  it('renders an <Axis isX={false} />', () => {
    const wrapper = shallow(<YAxis id="yAxis" />);
    expect(wrapper).toHaveProp('isX', false);
  });

  it('passes other props through to <Axis />', () => {
    const wrapper = shallow(<YAxis id="myOtherAxis" tickLength={1337} />);
    expect(wrapper).toHaveProp('tickLength',1337);
  });
});
