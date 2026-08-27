import * as React from 'react';
import { render } from '@testing-library/react';

import withHighcharts from '../../../src/components/WithHighcharts';
import ChartContext from '../../../src/components/ChartContext';
import { Highcharts } from '../../test-utils';
import ContextSpy from '../../ContextSpy';

describe('withHighcharts', () => {
  let highchartsRef;
  let WrappedComponent;
  let testChart;
  beforeEach(() => {
    highchartsRef = {};
    testChart = {};

    WrappedComponent = () => (
      <ChartContext.Provider value={testChart}>
        <ContextSpy highchartsRef={highchartsRef} />
      </ChartContext.Provider>
    );
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
