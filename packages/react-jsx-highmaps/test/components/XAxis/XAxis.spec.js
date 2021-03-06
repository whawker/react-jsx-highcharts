import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { XAxis } from 'react-jsx-highcharts';
import MapXAxis from '../../../src/components/XAxis';

describe('<XAxis />', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ShallowRenderer();
  });

  it('renders an <XAxis />', () => {
    renderer.render(<MapXAxis />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual(XAxis);
  });

  it('should always have the id `xAxis`', () => {
    renderer.render(<MapXAxis id="customId" />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('id', 'xAxis');
  });

  it('should NOT be a dynamic axis', () => {
    renderer.render(<MapXAxis />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('dynamicAxis', false);
  });

  it('passes other props through to <XAxis />', () => {
    renderer.render(<MapXAxis tickLength={1337} />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('tickLength', 1337);
  });
});
