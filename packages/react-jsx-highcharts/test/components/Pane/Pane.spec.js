import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Pane from '../../../src/components/Pane/Pane';

describe('<Pane />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
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
      }, true);
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
      }), true);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Pane', () => {
      const wrapper = mount(<Pane {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        pane: {}
      }), true)
    });
  });
});
