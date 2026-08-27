import * as React from 'react';
import { render } from '@testing-library/react';

import { Highcharts } from '../../test-utils';
import { HighchartsProvider } from '../../../src/components/WithHighcharts';
import PlotBandLineContext from '../../../src/components/PlotBandLineContext';
import ChartContext from '../../../src/components/ChartContext';
import ContextSpy from '../../ContextSpy';

describe('usePlotBandLine', () => {
  let ProvidedPlotBandLineComponent;
  let testPlotBandLine;
  let plotBandLineRef;
  let testChart;
  beforeEach(() => {
    testPlotBandLine = {};
    plotBandLineRef = {};
    testChart = {};

    ProvidedPlotBandLineComponent = () => (
      <HighchartsProvider Highcharts={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <PlotBandLineContext.Provider value={testPlotBandLine}>
            <ContextSpy plotBandLineRef={plotBandLineRef} />
          </PlotBandLineContext.Provider>
        </ChartContext.Provider>
      </HighchartsProvider>
    );
  });
  it('should return PlotBandLine from context', () => {
    render(<ProvidedPlotBandLineComponent />);

    expect(plotBandLineRef.current).toEqual(testPlotBandLine);
  });
});
