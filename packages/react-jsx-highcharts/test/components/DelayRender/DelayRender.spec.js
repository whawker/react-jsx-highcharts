import React from 'react';
import DelayRender from '../../../src/components/DelayRender/index';

const ChildComponent = props => (
  <div />
);

describe('<DelayRender />', () => {
  let clock;

  beforeAll(function () {
    clock = sinon.useFakeTimers();
  });

  afterAll(function () {
    clock.restore();
  });

  it('initially does not render the child component', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    expect(wrapper.find(ChildComponent)).to.not.exist;
  });

  it('renders the children on the next tick', () => {
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
