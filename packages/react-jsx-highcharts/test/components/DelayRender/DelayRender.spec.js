import React from 'react';
import DelayRender from '../../../src/components/DelayRender/index';
import { act } from 'react-dom/test-utils';

const ChildComponent = props => (
  <div />
);

describe('<DelayRender />', () => {

  beforeAll(function () {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => window.setTimeout(cb, 1));
    jest.spyOn(window, 'cancelAnimationFrame');
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    window.cancelAnimationFrame.mockRestore();
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
    act(() => {
      jest.advanceTimersByTime(1);
    });
    wrapper.update();

    expect(wrapper.find(ChildComponent)).toExist();
  });

  it('cancels the timeout if unmounted before tick', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    wrapper.unmount();

    expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(cancelAnimationFrame).toHaveBeenLastCalledWith(expect.any(Number));
  });
/* TODO move these tests to useDelay
  it('calls setState if the component is still mounted after tick', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
    jest.advanceTimersByTime(1);

    expect(setStateSpy).toHaveBeenCalledWith({ render: true });
  });

  it('does not setState if the component has been unmounted before tick', () => {
    const wrapper = mount(
      <DelayRender>
        <ChildComponent/>
      </DelayRender>
    );
    const setStateSpy = jest.spyOn(wrapper.instance(), 'setState');
    wrapper.unmount();
    jest.advanceTimersByTime(1);

    expect(setStateSpy).not.toHaveBeenCalled();
  });
  */
});
