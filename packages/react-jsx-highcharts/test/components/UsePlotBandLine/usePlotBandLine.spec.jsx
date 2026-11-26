import { render } from '@testing-library/react';

import { Highcharts } from '../../test-utils';
import { HighchartsProvider } from '../../../src/components/WithHighcharts';
import { PlotBandContext } from '../../../src/components/PlotBandLineContext';
import ChartContext from '../../../src/components/ChartContext';
import ContextSpy from '../../ContextSpy';

describe('usePlotBand', () => {
  let ProvidedPlotBandLineComponent;
  let testPlotBandLine;
  let plotBandRef;
  let testChart;
  beforeEach(() => {
    testPlotBandLine = {};
    plotBandRef = {};
    testChart = {};

    ProvidedPlotBandLineComponent = () => (
      <HighchartsProvider Highcharts={Highcharts}>
        <ChartContext.Provider value={testChart}>
          <PlotBandContext.Provider value={testPlotBandLine}>
            <ContextSpy plotBandRef={plotBandRef} />
          </PlotBandContext.Provider>
        </ChartContext.Provider>
      </HighchartsProvider>
    );
  });
  it('should return PlotBandLine from context', () => {
    render(<ProvidedPlotBandLineComponent />);

    expect(plotBandRef.current).toEqual(testPlotBandLine);
  });
});
