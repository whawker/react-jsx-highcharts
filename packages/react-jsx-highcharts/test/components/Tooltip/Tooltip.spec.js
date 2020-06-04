import * as React from 'react';
import { Highcharts, createMockProvidedChart } from '../../test-utils';
import Tooltip from '../../../src/components/Tooltip/Tooltip';
import HighchartsContext from '../../../src/components/HighchartsContext';
import ChartContext from '../../../src/components/ChartContext';

describe('<Tooltip />', () => {
  let testContext;
  let ProvidedTooltip;
  beforeEach(() => {
    testContext = {};

    const { chartStubs, needsRedraw } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;
    testContext.chart = {};
    testContext.chartStubs.object = testContext.chart;
    ProvidedTooltip = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <ChartContext.Provider value={chartStubs}>
          <Tooltip {...props} />
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('enables the tooltip', () => {
      mount(<ProvidedTooltip />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        tooltip: { enabled: true }
      });
    });

    it('updates the chart with the passed props', () => {
      mount(<ProvidedTooltip backgroundColor="red" shadow={false} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        tooltip: { backgroundColor: 'red', enabled: true, shadow: false }
      });
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<ProvidedTooltip selected={0} />);
      wrapper.setProps({ padding: 2 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        tooltip: { padding: 2 }
      });
    });
  });

  describe('when unmounted', () => {
    it('should disable the Tooltip', () => {
      const wrapper = mount(<ProvidedTooltip />);
      testContext.chartStubs.update.mockClear();
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledTimes(1);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        tooltip: { enabled: false }
      });
    });
  });
});
