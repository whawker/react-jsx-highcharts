import React, { Component } from 'react';
import withHighcharts from '../../../src/components/WithHighcharts';
import { Consumer } from '../../../src/components/HighchartsContext'
import { Highcharts } from '../../test-utils';

const ChildComponent = ({ value }) => (
  <div/>
)

const WrappedComponent = props => (
  <Consumer>
    { value => (
      <ChildComponent value={ value } />
    )}
  </Consumer>
);

describe('withHighcharts', () => {
  it('should create Highcharts context with the provided object', () => {
    const WithHighchartsComponent = withHighcharts(WrappedComponent, Highcharts);

    const wrapper = mount(<WithHighchartsComponent />);
    const child = wrapper.find(ChildComponent);

    expect(child).toHaveProp('value', Highcharts);
  });

  it('should create a Highcharts context with the provided object (2)', () => {
    const HighchartsWithExtraFunctionality = { ...Highcharts, Extras: () => 'Extras' };
    const WithHighchartsComponent = withHighcharts(WrappedComponent, HighchartsWithExtraFunctionality);
    const wrapper = mount(<WithHighchartsComponent />);

    const child = wrapper.find(ChildComponent);
    expect(child).toHaveProp('value', HighchartsWithExtraFunctionality);
  });
});
