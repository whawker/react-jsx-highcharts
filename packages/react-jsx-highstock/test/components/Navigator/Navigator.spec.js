import * as React from 'react';
import { render } from '@testing-library/react';

jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useChart: jest.fn(),
  useHighcharts: jest.fn()
}));

import { useChart, useHighcharts } from 'react-jsx-highcharts';
import Navigator from '../../../src/components/Navigator/Navigator';
import { Highcharts, createMockProvidedChart } from '../../test-utils';

describe('<Navigator />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { navigator: { enabled: false } }
    };
    const { chartStubs } = createMockProvidedChart({
      object: testContext.object
    });
    testContext.chartStubs = chartStubs;

    useChart.mockImplementation(() => chartStubs);
    useHighcharts.mockImplementation(() => Highcharts);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when mounted', () => {
    it('enables the Navigator', () => {
      render(<Navigator />);
      expect(testContext.object.options.navigator.enabled).toEqual(true);
    });

    it('fires the `beforeRender` event to so Highcharts creates a Navigator', () => {
      render(<Navigator />);
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(
        testContext.object,
        'beforeRender'
      );
    });

    it('updates the chart with the passed props', () => {
      render(<Navigator height={100} maskFill="rgba(1,2,3,0.45)" />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            enabled: true,
            height: 100,
            maskFill: 'rgba(1,2,3,0.45)'
          }
        },
        true
      );
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(<Navigator />);
      wrapper.rerender(<Navigator maskInside={false} />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            maskInside: false
          }
        },
        expect.any(Boolean)
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the Navigator', () => {
      const wrapper = render(<Navigator />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            enabled: false
          }
        },
        expect.any(Boolean)
      );
    });
  });
});
