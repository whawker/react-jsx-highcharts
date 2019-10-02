import React from 'react';
import useModifiedProps from '../../../src/components/UseModifiedProps';

describe('useChartUpdate', () => {
  let Component;
  let callback;

  beforeEach(() => {
    callback = jest.fn();
    Component = props => {
      const modifiedProps = useModifiedProps(props);
      callback(modifiedProps);
      return null;
    };
  });

  it('should return all props on initial mount', () => {
    const wrapper = mount(<Component someProp={true} />);
    expect(callback).toHaveBeenCalledWith({ someProp: true });
  });

  it('should return changed props', () => {
    const wrapper = mount(<Component someProp={false} otherProp={false} />);
    callback.mockClear();
    wrapper.setProps({ someProp: true });
    expect(callback).toHaveBeenCalledWith({ someProp: true });
  });

  it('should return false for not changed props', () => {
    const wrapper = mount(<Component someProp={true} />);
    callback.mockClear();
    wrapper.setProps({});
    expect(callback).toHaveBeenCalledWith(false);
  });

  it('should return false for empty props', () => {
    const wrapper = mount(<Component />);
    expect(callback).toHaveBeenCalledWith(false);
  });
});
