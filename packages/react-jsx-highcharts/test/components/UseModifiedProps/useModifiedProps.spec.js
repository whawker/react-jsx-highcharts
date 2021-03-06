import * as React from 'react';
import { render } from '@testing-library/react';

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
    const wrapper = render(<Component someProp={true} />);
    expect(callback).toHaveBeenCalledWith({ someProp: true });
  });

  it('should return changed props', () => {
    const wrapper = render(<Component someProp={false} otherProp={false} />);
    callback.mockClear();
    wrapper.rerender(<Component someProp={true} otherProp={false} />);

    expect(callback).toHaveBeenCalledWith({ someProp: true });
  });

  it('should return false for not changed props', () => {
    const wrapper = render(<Component someProp={true} />);
    callback.mockClear();
    wrapper.rerender(<Component someProp={true} />);

    expect(callback).toHaveBeenCalledWith(false);
  });

  it('should return false for empty props', () => {
    const wrapper = render(<Component />);

    expect(callback).toHaveBeenCalledWith(false);
  });
});
