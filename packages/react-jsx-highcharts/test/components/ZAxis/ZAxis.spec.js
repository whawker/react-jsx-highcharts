import React from 'react';
import ZAxis from '../../../src/components/ZAxis/ZAxis';
import Axis from '../../../src/components/Axis';

describe('<ZAxis />', () => {
  it('renders an <Axis />', () => {
    const wrapper = shallow(<ZAxis />);
    expect(wrapper.type()).toEqual(Axis);
  });

  it('should always have the id `zAxis`', () => {
    const wrapper = shallow(<ZAxis id="customId" />);
    expect(wrapper).toHaveProp('id', 'zAxis');
  });

  it('should NOT be a dynamic axis', () => {
    const wrapper = shallow(<ZAxis />);
    expect(wrapper).toHaveProp('dynamicAxis', false);
  });

  it('renders an <Axis isX={false} />', () => {
    const wrapper = shallow(<ZAxis id="ZAxis" />);
    expect(wrapper).toHaveProp('isX', false);
  });

  it('passes other props through to <Axis />', () => {
    const wrapper = shallow(<ZAxis tickLength={1337} />);
    expect(wrapper).toHaveProp('tickLength', 1337);
  });
});
