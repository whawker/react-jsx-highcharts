import React from 'react';
import { shallow } from 'enzyme';
import XAxis from '../../../src/components/XAxis';
import Axis from '../../../src/components/Axis';

describe('<XAxis />', function ()  {
  it('renders an <Axis />', function ()  {
    const wrapper = shallow(<XAxis />);
    expect(wrapper).to.have.type(Axis);
  });

  it('renders an <Axis dimension="x" />', function () {
    const wrapper = shallow(<XAxis />);
    expect(wrapper).to.have.prop('dimension').equal('x');
  });

  it('passes other props through to <Axis />', function () {
    const wrapper = shallow(<XAxis tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });
});
