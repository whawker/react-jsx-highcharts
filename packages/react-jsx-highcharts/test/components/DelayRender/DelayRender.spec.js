import React from 'react';
import DelayRender from '../../../src/components/DelayRender/index';

const ChildComponent = props => (
  <div />
);

describe('<DelayRender />', () => {

  beforeAll(function () {
    jest.useFakeTimers();
  });


  it('initially does not render the child component', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    expect(wrapper.find(ChildComponent)).not.toExist();
  });

  it('renders the children on the next tick', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    jest.advanceTimersByTime(1);
    wrapper.update();

    expect(wrapper.find(ChildComponent)).toExist();
  });
});
