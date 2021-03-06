import * as React from 'react';
import { render } from '@testing-library/react';

import useHighcharts from '../../../src/components/UseHighcharts';
import HighchartsContext from '../../../src/components/HighchartsContext';
import { Highcharts } from '../../test-utils';

import ContextSpy from '../../ContextSpy';

describe('useHighcharts', () => {
  let ProvidedHighchartsComponent;
  let highchartsRef;

  beforeEach(() => {
    highchartsRef = {};

    ProvidedHighchartsComponent = () => (
      <HighchartsContext.Provider value={Highcharts}>
        <ContextSpy highchartsRef={highchartsRef} />
      </HighchartsContext.Provider>
    );
  });
  it('should return Highcharts from context', () => {
    render(<ProvidedHighchartsComponent />);

    expect(highchartsRef.current).toEqual(Highcharts);
  });
});
