import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import PropTypes from 'prop-types';
import withSeriesType from '../../../src/components/WithSeriesType';
import Series from '../../../src/components/Series';

describe('withSeriesType', () => {
  let renderer;

  beforeEach(() => {
    renderer = new ShallowRenderer();
  });

  it('should create Series component', () => {
    const SeriesComponent = withSeriesType('line');
    renderer.render(<SeriesComponent />);
    const result = renderer.getRenderOutput();

    expect(result.type).toEqual(Series);
  });

  it(`should set type attribute <Series type="line" />`, () => {
    const SeriesComponent = withSeriesType('line');
    renderer.render(<SeriesComponent />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('type', 'line');
  });

  it(`the created component should pass additional props through to Series`, () => {
    const SeriesComponent = withSeriesType('line');
    renderer.render(<SeriesComponent data={[1, 2, 3, 4]} />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('data', [1, 2, 3, 4]);
  });

  it(`should set id propType`, () => {
    const SeriesComponent = withSeriesType('line');
    expect(SeriesComponent.propTypes).toHaveProperty('id');
  });

  it(`should add additionalPropTypes`, () => {
    const SeriesComponent = withSeriesType(
      'line',
      {},
      { baseSeries: PropTypes.string.isRequired }
    );
    expect(SeriesComponent.propTypes).toHaveProperty('baseSeries');
  });

  it(`should pass additionalProps to Series`, () => {
    const SeriesComponent = withSeriesType('line', { requiresAxis: false });
    renderer.render(<SeriesComponent />);
    const result = renderer.getRenderOutput();

    expect(result.props).toHaveProperty('requiresAxis', false);
  });
});
