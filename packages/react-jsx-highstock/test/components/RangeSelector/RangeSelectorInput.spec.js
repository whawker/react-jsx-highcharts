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
import RangeSelectorInput from '../../../src/components/RangeSelector/RangeSelectorInput';

describe('<RangeSelectorInput />', () => {
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
    it('sets the rangeselector input', () => {
      render(
        <RangeSelector>
          <RangeSelectorInput boxBorderColor="#ffffff" />
        </RangeSelector>
      );

      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          inputBoxBorderColor: '#ffffff',
          inputEnabled: true
        }
      });
    });
  });
});
