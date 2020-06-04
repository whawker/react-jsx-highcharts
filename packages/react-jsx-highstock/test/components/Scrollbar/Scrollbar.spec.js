import * as React from 'react';
import { createMockProvidedChart } from '../../test-utils';

jest.mock('react-jsx-highcharts', () => ({
  ...jest.requireActual('react-jsx-highcharts'),
  useChart: jest.fn()
}));

import { useChart } from 'react-jsx-highcharts';
import Scrollbar from '../../../src/components/Scrollbar/Scrollbar';
import { HighchartsChartContext } from 'react-jsx-highcharts';

describe('<Scrollbar />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs } = createMockProvidedChart({
      object: testContext.object
    });
    testContext.chartStubs = chartStubs;
    useChart.mockImplementation(() => chartStubs);
  });

  describe('when mounted', () => {
    it('add scrollbar using the Highcharts update method', () => {
      mount(<Scrollbar />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          scrollbar: {
            enabled: true
          }
        },
        true
      );
    });

    it('updates the scrollbar with the passed props', () => {
      mount(<Scrollbar barBackgroundColor="red" height={20} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          scrollbar: {
            enabled: true,
            barBackgroundColor: 'red',
            height: 20
          }
        },
        true
      );
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<Scrollbar />);
      testContext.chartStubs.update.mockClear();
      wrapper.setProps({ height: 12345 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          scrollbar: {
            height: 12345
          }
        },
        true
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the Scrollbar', () => {
      const wrapper = mount(<Scrollbar />);
      testContext.chartStubs.update.mockClear();
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          scrollbar: {
            enabled: false
          }
        },
        true
      );
    });
  });
});
