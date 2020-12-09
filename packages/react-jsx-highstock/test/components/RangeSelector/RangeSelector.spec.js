import * as React from 'react';
import { render } from '@testing-library/react';

import {
  Highcharts,
  createMockProvidedChart,
  createMockProvidedAxis
} from '../../test-utils';
jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useChart: jest.fn(),
  useHighcharts: jest.fn(),
  useAxis: jest.fn()
}));
import { useAxis, useChart, useHighcharts } from 'react-jsx-highcharts';

import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';

describe('<RangeSelector />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { rangeSelector: { enabled: false } }
    };
    const { chartStubs } = createMockProvidedChart({
      object: testContext.object
    });
    testContext.chartStubs = chartStubs;
    testContext.chartStubs.update.mockReset();
    testContext.axisObject = {};
    const { axisStubs } = createMockProvidedAxis({
      object: testContext.axisObject
    });
    testContext.axisStubs = axisStubs;

    useAxis.mockImplementation(id => {
      axisStubs.id = id;
      return axisStubs;
    });

    useChart.mockImplementation(() => chartStubs);
    useHighcharts.mockImplementation(() => Highcharts);
  });

  describe('when mounted', () => {
    it('enables the RangeSelector', () => {
      render(<RangeSelector />);

      expect(testContext.object.options.rangeSelector.enabled).toEqual(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', () => {
      render(<RangeSelector />);

      expect(Highcharts.fireEvent).toHaveBeenCalledWith(
        testContext.object,
        'afterGetContainer'
      );
    });

    it('updates the chart with the passed props', () => {
      render(<RangeSelector height={100} buttonSpacing={2} />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          rangeSelector: {
            enabled: true,
            inputEnabled: false,
            height: 100,
            buttonSpacing: 2,
            buttons: []
          }
        },
        expect.any(Boolean)
      );
    });

    it('updates the chart once', () => {
      render(<RangeSelector />);

      expect(testContext.chartStubs.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(<RangeSelector selected={0} />);
      testContext.chartStubs.update.mockClear();
      wrapper.rerender(<RangeSelector selected={2} />);

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          rangeSelector: {
            selected: 2
          }
        },
        expect.any(Boolean)
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the RangeSelector', () => {
      const wrapper = render(<RangeSelector />);
      testContext.chartStubs.update.mockClear();
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          rangeSelector: {
            enabled: false
          }
        },
        expect.any(Boolean)
      );
    });
  });
});
