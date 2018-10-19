import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withSeriesType from '../../../src/components/WithSeriesType';
import Series from '../../../src/components/Series';

describe('withSeriesType', function ()  {
  it('should create Series component', function () {
    const SeriesComponent = withSeriesType('line');
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper).to.have.type(Series);

  });
  it(`should set type attribute <Series type="line" />`, function () {
    const SeriesComponent = withSeriesType('line');
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper).to.have.prop('type').equal('line');
  });
  it(`should set id propType`, function () {
    const SeriesComponent = withSeriesType('line');
    expect(SeriesComponent.propTypes).to.have.property('id');
  });
  it(`should add additionalPropTypes`, function () {
    const SeriesComponent = withSeriesType('line', {}, { baseSeries: PropTypes.string.isRequired });
    expect(SeriesComponent.propTypes).to.have.property('baseSeries');
  });
  it(`should pass additionalProps to Series`, function () {
    const SeriesComponent = withSeriesType('line', { requiresAxis: false });
    const wrapper = shallow(<SeriesComponent />);
    expect(wrapper).to.have.prop('requiresAxis').equal(false);
  });
});
