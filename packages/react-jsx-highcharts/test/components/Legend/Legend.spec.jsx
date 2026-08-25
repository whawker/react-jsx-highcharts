import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Legend from '../../../src/components/Legend/Legend';
import ChartContext from '../../../src/components/ChartContext';

describe('<Legend />', () => {
  let testContext;

  let ProvidedLegend;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();

    ProvidedLegend = props => (
      <ChartContext.Provider value={chartStubs}>
        <Legend {...props} />
      </ChartContext.Provider>
    );
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;
  });

  describe('when mounted', () => {
    it('add legend using the Highcharts update method', () => {
      render(<ProvidedLegend />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            enabled: true
          }
        },
        false
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('updates the legend with the passed props', () => {
      render(<ProvidedLegend align="left" y={20} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            enabled: true,
            align: 'left',
            y: 20
          }
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(<ProvidedLegend />);
      wrapper.rerender(<ProvidedLegend backgroundColor="red" />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            backgroundColor: 'red'
          }
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Legend', () => {
      const wrapper = render(<ProvidedLegend />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            enabled: false
          }
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
