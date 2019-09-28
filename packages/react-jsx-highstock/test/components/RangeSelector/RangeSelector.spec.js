import React from 'react';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis } from '../../test-utils';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import { HighchartsContext, HighchartsChartContext, HighchartsAxisContext, XAxis} from 'react-jsx-highcharts';

describe('<RangeSelector />', () => {
  let testContext;
  let ProvidedRangeSelector;

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

    ProvidedRangeSelector = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <HighchartsChartContext.Provider value={chartStubs}>
          <HighchartsAxisContext.Provider value={axisStubs}>
            <RangeSelector {...props} />
          </HighchartsAxisContext.Provider>
        </HighchartsChartContext.Provider>
      </HighchartsContext.Provider>
    )
  });

  describe('when mounted', () => {

    it('enables the RangeSelector', () => {
      mount(<ProvidedRangeSelector />);
      expect(testContext.object.options.rangeSelector.enabled).toEqual(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', () => {
      mount(<ProvidedRangeSelector />);
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'init');
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'afterGetContainer');
    });

    it('updates the chart with the passed props', () => {
      mount(<ProvidedRangeSelector height={100} buttonSpacing={2} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          enabled: true,
          inputEnabled: false,
          height: 100,
          buttonSpacing: 2,
          buttons: []
        }
      }, expect.any(Boolean));
    });

    it('updates the chart once', () => {
      mount(<ProvidedRangeSelector />);
      expect(testContext.chartStubs.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<ProvidedRangeSelector selected={0} />);
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
      const wrapper = mount(<ProvidedRangeSelector />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        rangeSelector: {
          enabled: false
        }
      }, expect.any(Boolean));
    });
  });
});
