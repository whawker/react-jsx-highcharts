import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import YAxis from '../../../src/components/YAxis/YAxis';
import Axis from '../../../src/components/Axis';

describe('<YAxis />', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ShallowRenderer();
  });

  it('renders an <Axis />', () => {
    renderer.render(<YAxis id="y" />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual(Axis);
  });

  it('renders an <Axis isX={false} />', () => {
    renderer.render(<YAxis id="yAxis" />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('isX', false);
  });

  it('passes other props through to <Axis />', () => {
    renderer.render(<YAxis id="myOtherAxis" tickLength={1337} />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('tickLength', 1337);
  });
});
