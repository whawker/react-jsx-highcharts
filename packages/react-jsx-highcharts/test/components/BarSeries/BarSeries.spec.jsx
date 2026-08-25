import * as React from 'react';
import { render } from '@testing-library/react';

import {
  Highcharts,
  createMockProvidedChart,
  createMockProvidedAxis
} from '../../test-utils';
import BarSeries from '../../../src/components/BarSeries/BarSeries';
import ChartContext from '../../../src/components/ChartContext';
import AxisContext from '../../../src/components/AxisContext';
import HighchartsContext from '../../../src/components/HighchartsContext';

describe('<BarSeries />', () => {
  let testContext;
  let ProvidedBarSeries;
  beforeEach(() => {
    testContext = {};

    const { chartStubs } = createMockProvidedChart();
    const { providedAxis } = createMockProvidedAxis({
      id: 'myAxis',
      type: 'yAxis'
    });
    testContext.chartStubs = chartStubs;
    testContext.providedAxis = providedAxis;

    const highchartsValue = () => Highcharts;

    ProvidedBarSeries = props => (
      <HighchartsContext.Provider value={highchartsValue}>
        <ChartContext.Provider value={chartStubs}>
          <AxisContext.Provider value={providedAxis}>
            <BarSeries {...props} />
          </AxisContext.Provider>
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    );
  });

  it('adds a series with type="bar" />', () => {
    render(<ProvidedBarSeries id="mySeries" />);
    expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'bar' }),
      false
    );
  });

  it('passes other props through to series', () => {
    render(<ProvidedBarSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
      expect.objectContaining({ data: [1, 2, 3, 4] }),
      false
    );
  });

  it('inverts the chart on mount', () => {
    render(<ProvidedBarSeries id="mySeries" />);
    expect(testContext.chartStubs.update).toHaveBeenCalledWith({
      chart: {
        inverted: true
      }
    });
  });
});
