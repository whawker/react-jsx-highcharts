import React, { Component } from 'react';
import withHighcharts from '../../../src/components/WithHighcharts';
import { Highcharts } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);

describe('withHighcharts', function ()  {
  it('should create a Highcharts context with the provided object', function () {
    const WithHighchartsComponent = withHighcharts(WrappedComponent, Highcharts);
    const wrapper = mount(<WithHighchartsComponent />);
    const context = wrapper.instance().getChildContext();

    expect(context.Highcharts).to.eql(Highcharts);
  });

  it('should create a Highcharts context with the provided object (2)', function () {
    const HighchartsWithExtraFunctionality = { ...Highcharts, Extras: () => 'Extras' };
    const WithHighchartsComponent = withHighcharts(WrappedComponent, HighchartsWithExtraFunctionality);
    const wrapper = mount(<WithHighchartsComponent />);
    const context = wrapper.instance().getChildContext();

    expect(context.Highcharts).to.eql(HighchartsWithExtraFunctionality);
  });
});
