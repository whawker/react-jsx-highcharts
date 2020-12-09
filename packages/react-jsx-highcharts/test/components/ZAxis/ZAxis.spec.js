import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import ZAxis from '../../../src/components/ZAxis/ZAxis';
import Axis from '../../../src/components/Axis';

describe('<ZAxis />', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ShallowRenderer();
  });

  it('renders an <Axis />', () => {
    renderer.render(<ZAxis />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual(Axis);
  });

  it('should always have the id `zAxis`', () => {
    renderer.render(<ZAxis id="customId" />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('id', 'zAxis');
  });

  it('should NOT be a dynamic axis', () => {
    renderer.render(<ZAxis />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('dynamicAxis', false);
  });

  it('renders an <Axis isX={false} />', () => {
    renderer.render(<ZAxis id="ZAxis" />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('isX', false);
  });

  it('passes other props through to <Axis />', () => {
    renderer.render(<ZAxis tickLength={1337} />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('tickLength', 1337);
  });
});
