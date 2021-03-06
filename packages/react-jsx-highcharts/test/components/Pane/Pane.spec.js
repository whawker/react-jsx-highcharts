import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Pane from '../../../src/components/Pane/Pane';
import ChartContext from '../../../src/components/ChartContext';

describe('<Pane />', () => {
  let testContext;
  let ProvidedPane;
  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;

    ProvidedPane = props => (
      <ChartContext.Provider value={chartStubs}>
        <Pane {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('set Pane options using the Highcharts update method', () => {
      render(<ProvidedPane center={['50%', '85%']} size="100%" />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          pane: {
            center: ['50%', '85%'],
            size: '100%'
          }
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('does not add pane with empty props', () => {
      render(<ProvidedPane />);
      expect(testContext.chartStubs.update).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(<ProvidedPane />);
      wrapper.rerender(<ProvidedPane size="50%" />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          pane: {
            size: '50%'
          }
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Pane', () => {
      const wrapper = render(<ProvidedPane size="100%" />);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
      testContext.needsRedraw.mockClear();
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          pane: {}
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });
});
