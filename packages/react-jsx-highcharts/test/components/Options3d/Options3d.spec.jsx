import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Options3d from '../../../src/components/Options3d/Options3d';
import ChartContext from '../../../src/components/ChartContext';

const defaultProps = {
  enabled: false,
  alpha: 0,
  beta: 0,
  depth: 100,
  fitToPlot: true,
  viewDistance: 25,
  axisLabelPosition: 'default',
  frame: {
    visible: 'default',
    size: 1,
    bottom: {},
    top: {},
    left: {},
    right: {},
    back: {},
    front: {}
  }
};

describe('<Options3d />', () => {
  let testContext;
  let ProvidedOptions3d;

  beforeEach(() => {
    testContext = {};
    const { chartStubs } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    ProvidedOptions3d = props => (
      <ChartContext.Provider value={chartStubs}>
        <Options3d {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('updates the chart with the passed props', () => {
      render(<ProvidedOptions3d alpha={10} beta={20} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          chart: {
            options3d: {
              ...defaultProps,
              enabled: true,
              alpha: 10,
              beta: 20
            }
          }
        },
        true
      );
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(<ProvidedOptions3d alpha={0} />);
      wrapper.rerender(<ProvidedOptions3d alpha={45} />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          chart: {
            options3d: {
              ...defaultProps,
              enabled: true,
              alpha: 45
            }
          }
        },
        true
      );
    });
  });
});
