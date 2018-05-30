import React from 'react';
import DelayRender from '../../../src/components/DelayRender/index';

const ChildComponent = props => (
  <div />
);

describe('<DelayRender />', function ()  {
  let clock;

  before(function () {
    clock = sinon.useFakeTimers();
  });

  after(function () {
    clock.restore();
  });

  it('initially does not render the child component', function ()  {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    expect(wrapper.find(ChildComponent)).to.not.exist;
  });

  it('renders the children on the next tick', function ()  {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    clock.tick(1);
    wrapper.update();

    expect(wrapper.find(ChildComponent)).to.exist;
  });
});
