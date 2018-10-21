import React from 'react';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis } from '../../test-utils';
import { _RangeSelectorInner as RangeSelectorInner } from '../../../src/components/RangeSelector/RangeSelectorInner';

describe('<RangeSelectorInner />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { rangeSelector: { enabled: false } }
    };
    const { chartStubs, getChart } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;
    testContext.chartStubs.update.mockReset();
    testContext.axisObject = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ object: testContext.axisObject });
    testContext.axisStubs = axisStubs;

    testContext.propsFromProviders = {
      getChart,
      getAxis,
      getHighcharts: () => Highcharts
    };
  });

  describe('when mounted', () => {

    it('enables the RangeSelector', () => {
      mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      expect(testContext.object.options.rangeSelector.enabled).toEqual(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', () => {
      mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'init');
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'afterGetContainer');
    });

    it('updates the chart with the passed props', () => {
      mount(<RangeSelectorInner height={100} buttonSpacing={2} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: expect.objectContaining({
          enabled: true,
          inputEnabled: false,
          height: 100,
          buttonSpacing: 2
        })
      }, expect.any(Boolean));
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<RangeSelectorInner selected={0} {...testContext.propsFromProviders} />);
      wrapper.setProps({ selected: 2 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          selected: 2
        }
      }, expect.any(Boolean));
    });
  });

  describe('when unmounted', () => {
    it('should disable the RangeSelector', () => {
      const wrapper = mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          enabled: false
        }
      }, expect.any(Boolean));
    });
  });
});
