import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Pane from '../../../src/components/Pane/Pane';

describe('<Pane />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart,
      needsRedraw
    };
  });

  describe('when mounted', () => {
    it('set Pane options using the Highcharts update method', () => {
      mount(
        <Pane center={['50%', '85%']} size='100%' {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        pane: expect.objectContaining({
          center: ['50%', '85%'],
          size: '100%'
        })
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <Pane {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ size: '50%' });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        pane: {
          size: '50%'
        }
      }), false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Pane', () => {
      const wrapper = mount(<Pane {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        pane: {}
      }), false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
