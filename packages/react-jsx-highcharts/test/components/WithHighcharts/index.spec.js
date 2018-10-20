import React, { Component } from 'react';
import withHighcharts from '../../../src/components/WithHighcharts';
import { Provider } from '../../../src/components/HighchartsContext'
import { Highcharts } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);

describe('withHighcharts', () => {
  it('should create Highcharts context with the provided object', () => {
    const WithHighchartsComponent = withHighcharts(WrappedComponent, Highcharts);
    const wrapper = mount(<WithHighchartsComponent />);

    expect(wrapper.childAt(0).type()).toBe(Provider);
    expect(wrapper.childAt(0)).toHaveProp('value', Highcharts);
  });

  it('should create a Highcharts context with the provided object (2)', () => {
    const HighchartsWithExtraFunctionality = { ...Highcharts, Extras: () => 'Extras' };
    const WithHighchartsComponent = withHighcharts(WrappedComponent, HighchartsWithExtraFunctionality);
    const wrapper = mount(<WithHighchartsComponent />);

    expect(wrapper.childAt(0).type()).toBe(Provider);
    expect(wrapper.childAt(0)).toHaveProp('value', HighchartsWithExtraFunctionality);
  });
});
