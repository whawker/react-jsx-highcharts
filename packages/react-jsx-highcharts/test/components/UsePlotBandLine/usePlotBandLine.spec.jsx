import * as React from 'react';
import { render } from '@testing-library/react';

import PlotBandLineContext from '../../../src/components/PlotBandLineContext';

import ContextSpy from '../../ContextSpy';

describe('usePlotBandLine', () => {
  let ProvidedPlotBandLineComponent;
  let testPlotBandLine;
  let plotBandLineRef;

  beforeEach(() => {
    testPlotBandLine = {};
    plotBandLineRef = {};

    ProvidedPlotBandLineComponent = () => (
      <PlotBandLineContext.Provider value={testPlotBandLine}>
        <ContextSpy plotBandLineRef={plotBandLineRef} />
      </PlotBandLineContext.Provider>
    );
  });
  it('should return PlotBandLine from context', () => {
    render(<ProvidedPlotBandLineComponent />);

    expect(plotBandLineRef.current).toEqual(testPlotBandLine);
  });
});
