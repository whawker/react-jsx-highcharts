import * as React from 'react';
import { render } from '@testing-library/react';

import withHighcharts from '../../../src/components/WithHighcharts';
import HighchartsContext from '../../../src/components/HighchartsContext';
import { Highcharts } from '../../test-utils';
import ContextSpy from '../../ContextSpy';

describe('withHighcharts', () => {
  let highchartsRef;
  let WrappedComponent;

  beforeEach(() => {
    highchartsRef = {};

    WrappedComponent = () => <ContextSpy highchartsRef={highchartsRef} />;
  });

  it('should create Highcharts context with the provided object', () => {
    const WithHighchartsComponent = withHighcharts(
      WrappedComponent,
      Highcharts
    );
    render(<WithHighchartsComponent />);

    expect(highchartsRef.current).toEqual(Highcharts);
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
    render(<WithHighchartsComponent />);

    expect(highchartsRef.current).toEqual(HighchartsWithExtraFunctionality);
  });
});
