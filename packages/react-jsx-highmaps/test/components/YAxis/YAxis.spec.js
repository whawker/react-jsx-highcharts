import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { YAxis } from 'react-jsx-highcharts';
import MapYAxis from '../../../src/components/YAxis';

describe('<YAxis />', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ShallowRenderer();
  });

  it('renders a <YAxis />', () => {
    renderer.render(<MapYAxis />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual(YAxis);
  });

  it('should always have the id `yAxis`', () => {
    renderer.render(<MapYAxis id="customId" />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('id', 'yAxis');
  });

  it('should NOT be a dynamic axis', () => {
    renderer.render(<MapYAxis />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('dynamicAxis', false);
  });

  it('passes other props through to <YAxis />', () => {
    renderer.render(<MapYAxis tickLength={1337} />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('tickLength', 1337);
  });
});
