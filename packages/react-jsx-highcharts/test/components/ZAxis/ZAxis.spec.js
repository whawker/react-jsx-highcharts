import React from 'react';
import ZAxis from '../../../src/components/ZAxis/ZAxis';
import Axis from '../../../src/components/Axis';

describe('<ZAxis />', function ()  {
  it('renders an <Axis />', function ()  {
    const wrapper = shallow(<ZAxis />);
    expect(wrapper).to.have.type(Axis);
  });

  it('should always have the id `zAxis`', function ()  {
    const wrapper = shallow(<ZAxis id="customId" />);
    expect(wrapper).to.have.prop('id').equal('zAxis');
  });

  it('should NOT be a dynamic axis', function ()  {
    const wrapper = shallow(<ZAxis />);
    expect(wrapper).to.have.prop('dynamicAxis').equal(false);
  });

  it('renders an <Axis isX={false} />', function () {
    const wrapper = shallow(<ZAxis id="ZAxis" />);
    expect(wrapper).to.have.prop('isX').equal(false);
  });

  it('passes other props through to <Axis />', function () {
    const wrapper = shallow(<ZAxis tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });
});
