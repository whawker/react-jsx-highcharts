import * as React from 'react';
import withHighcharts from '../../../src/components/WithHighcharts';
import HighchartsContext from '../../../src/components/HighchartsContext';
import { Highcharts } from '../../test-utils';

const ChildComponent = ({ value }) => <div />;

const WrappedComponent = props => (
  <HighchartsContext.Consumer>
    {value => <ChildComponent value={value} />}
  </HighchartsContext.Consumer>
);

describe('withHighcharts', () => {
  it('should create Highcharts context with the provided object', () => {
    const WithHighchartsComponent = withHighcharts(
      WrappedComponent,
      Highcharts
    );

    const wrapper = mount(<WithHighchartsComponent />);
    const child = wrapper.find(ChildComponent);
    const providedValue = child.prop('value');
    expect(providedValue).toEqual(Highcharts);
  });

  it('should create a Highcharts context with the provided object (2)', () => {
    const HighchartsWithExtraFunctionality = {
      ...Highcharts,
      Extras: () => 'Extras'
    };
    const WithHighchartsComponent = withHighcharts(
      WrappedComponent,
      HighchartsWithExtraFunctionality
    );
    const wrapper = mount(<WithHighchartsComponent />);

    const child = wrapper.find(ChildComponent);
    const providedValue = child.prop('value');
    expect(providedValue).toEqual(HighchartsWithExtraFunctionality);
  });
});
