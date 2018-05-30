import React, { Component } from 'react';
import withHighcharts from '../../../src/components/WithHighcharts';
import { Provider } from '../../../src/components/HighchartsContext'
import { Highcharts } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);

describe('withHighcharts', function ()  {
  it('should create Highcharts context with the provided object', function () {
    const WithHighchartsComponent = withHighcharts(WrappedComponent, Highcharts);
    const wrapper = mount(<WithHighchartsComponent />);

    expect(wrapper.childAt(0)).to.have.type(Provider);
    expect(wrapper.childAt(0)).to.have.prop('value').to.equal(Highcharts);
  });

  it('should create a Highcharts context with the provided object (2)', function () {
    const HighchartsWithExtraFunctionality = { ...Highcharts, Extras: () => 'Extras' };
    const WithHighchartsComponent = withHighcharts(WrappedComponent, HighchartsWithExtraFunctionality);
    const wrapper = mount(<WithHighchartsComponent />);

    expect(wrapper.childAt(0)).to.have.type(Provider);
    expect(wrapper.childAt(0)).to.have.prop('value').to.equal(HighchartsWithExtraFunctionality);
  });
});
