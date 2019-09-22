import React from 'react';
import { act } from 'react-dom/test-utils'
import useDelayOnce from '../../../src/components/UseDelayOnce';

describe('useDelayOnce', () => {
  let Component;
  let delayCallback;
  let renderCallback;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => window.setTimeout(cb, 0));
    jest.spyOn(window, 'cancelAnimationFrame');

    delayCallback = jest.fn();
    renderCallback = jest.fn();

    Component = props => {
      const axis = useDelayOnce(delayCallback);
      renderCallback();
      return null;
    }
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    window.cancelAnimationFrame.mockRestore();
    jest.clearAllTimers();
  });

  it('should not callback before delay is passed', () => {
    const wrapper = mount(<Component />);

    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(delayCallback).not.toHaveBeenCalled();
  });

  it('should callback after delay', () => {
    const wrapper = mount(<Component />);

    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(delayCallback).not.toHaveBeenCalled();

    act(()=> {
      jest.runAllTimers();
    });

    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(delayCallback).toHaveBeenCalledTimes(1);
  });

  it('should not callback after unmount', () => {
    const wrapper = mount(<Component />);

    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(delayCallback).not.toHaveBeenCalled();
    wrapper.unmount();

    act(()=> {
      jest.runAllTimers();
    });

    expect(renderCallback).toHaveBeenCalledTimes(1);
    expect(delayCallback).not.toHaveBeenCalled();
  });
});
