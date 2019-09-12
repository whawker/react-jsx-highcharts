import React from 'react';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis } from '../../test-utils';
import RangeSelectorInner from '../../../src/components/RangeSelector/RangeSelectorInner';
import { HighchartsContext, HighchartsChartContext, HighchartsAxisContext} from 'react-jsx-highcharts';

describe('<RangeSelectorInner />', () => {
  let testContext;
  let ProvidedRangeSelectorInner;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { rangeSelector: { enabled: false } }
    };
    const { chartStubs } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;
    testContext.chartStubs.update.mockReset();
    testContext.axisObject = {};
    const { axisStubs } = createMockProvidedAxis({ object: testContext.axisObject });
    testContext.axisStubs = axisStubs;

    ProvidedRangeSelectorInner = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <HighchartsChartContext.Provider value={chartStubs}>
          <HighchartsAxisContext.Provider value={axisStubs}>
            <RangeSelectorInner {...props} />
          </HighchartsAxisContext.Provider>
        </HighchartsChartContext.Provider>
      </HighchartsContext.Provider>
    )
  });

  describe('when mounted', () => {

    it('enables the RangeSelector', () => {
      mount(<ProvidedRangeSelectorInner />);
      expect(testContext.object.options.rangeSelector.enabled).toEqual(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', () => {
      mount(<ProvidedRangeSelectorInner />);
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'init');
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'afterGetContainer');
    });

    it('updates the chart with the passed props', () => {
      mount(<ProvidedRangeSelectorInner height={100} buttonSpacing={2} />);
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
      const wrapper = mount(<ProvidedRangeSelectorInner selected={0} />);
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
      const wrapper = mount(<ProvidedRangeSelectorInner />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          enabled: false
        }
      }, expect.any(Boolean));
    });
  });
});
