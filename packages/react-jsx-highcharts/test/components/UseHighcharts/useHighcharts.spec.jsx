import * as React from 'react';
import { render } from '@testing-library/react';

import ChartContext from '../../../src/components/ChartContext';
import HighchartsContext from '../../../src/components/HighchartsContext';
import { Highcharts } from '../../test-utils';

import ContextSpy from '../../ContextSpy';

describe('useHighcharts', () => {
  let ProvidedHighchartsComponent;
  let highchartsRef;
  let testChart;
  beforeEach(() => {
    testChart = {};
    highchartsRef = {};

    ProvidedHighchartsComponent = () => (
      <HighchartsContext.Provider value={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <ContextSpy highchartsRef={highchartsRef} />
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    );
  });
  it('should return Highcharts from context', () => {
    render(<ProvidedHighchartsComponent />);

    expect(highchartsRef.current).toEqual(Highcharts);
  });
});
