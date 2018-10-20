import React from 'react';
import { createMockProvidedChart, Highcharts } from '../../test-utils'
import Credits from '../../../src/components/Credits/Credits';

describe('<Credits />', () => {
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
    it('add credits using the Highcharts addCredits method', () => {
      mount(<Credits {...testContext.propsFromProviders}>github.com</Credits>);
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        enabled: true,
        text: 'github.com'
      }), true);
    });

    it('addCreditss the credits with the passed props', () => {
      mount(
        <Credits href="https://www.github.com" {...testContext.propsFromProviders}>github.com</Credits>
      );
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        enabled: true,
        href: 'https://www.github.com',
        text: 'github.com'
      }), true);
    });
  });

  describe('addCredits', () => {
    it('should use the addCredits method when props change', () => {
      const wrapper = mount(
        <Credits href="https://www.github.com" {...testContext.propsFromProviders}>github.com</Credits>
      );
      wrapper.setProps({ href: 'https://www.github.com/whawker' });
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        href: 'https://www.github.com/whawker'
      }), true);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Credits', () => {
      const wrapper = mount(<Credits {...testContext.propsFromProviders}>github.com</Credits>);
      wrapper.unmount();
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        enabled: false
      }), true);
    });
  });
});
