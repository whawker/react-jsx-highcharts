import React from 'react';
import { Highcharts, createMockProvidedChart } from '../../test-utils'
import Tooltip from '../../../src/components/Tooltip/Tooltip';

describe('<Tooltip />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;
    testContext.chart = {};
    testContext.chartStubs.object = testContext.chart;

    testContext.propsFromProviders = {
      getChart,
      needsRedraw,
      getHighcharts: () => Highcharts
    };
  });


  describe('when mounted', () => {
    it('creates a new Highcharts Tooltip instance', () => {
      mount(<Tooltip {...testContext.propsFromProviders} />);
      expect(Highcharts.Tooltip).toHaveBeenCalled(); // calledWithNew
    });

    it('updates the chart with the passed props', () => {
      mount(<Tooltip backgroundColor="red" shadow={false} {...testContext.propsFromProviders} />);
      expect(Highcharts.Tooltip).toHaveBeenCalledWith(testContext.chart, {
        backgroundColor: 'red',
        enabled: true,
        shadow: false
      });
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<Tooltip selected={0} {...testContext.propsFromProviders} />);
      wrapper.setProps({ padding: 2 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        tooltip: {
          padding: 2
        }
      }), false);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Tooltip', () => {
      const wrapper = mount(<Tooltip {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        tooltip: {
          enabled: false
        }
      }), false)
    });
  });
});
