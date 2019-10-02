import React from 'react';
import PropTypes from 'prop-types';
import withSeriesType from '../../../src/components/WithSeriesType';
import Series from '../../../src/components/Series';

describe('withSeriesType', () => {
  it('should create Series component', () => {
    const SeriesComponent = withSeriesType('line');
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper.type()).toEqual(Series);
  });

  it(`should set type attribute <Series type="line" />`, () => {
    const SeriesComponent = withSeriesType('line');
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper).toHaveProp('type', 'line');
  });

  it(`the created component should pass additional props through to Series`, () => {
    const SeriesComponent = withSeriesType('line');
    const wrapper = shallow(<SeriesComponent data={[1, 2, 3, 4]} />);
    expect(wrapper).toHaveProp('data', [1, 2, 3, 4]);
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
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper).toHaveProp('requiresAxis', false);
  });
});
