import React from 'react';
import { createMockProvidedChart, Highcharts } from '../../test-utils'
import Credits from '../../../src/components/Credits/Credits';
import ChartContext from '../../../src/components/ChartContext';

describe('<Credits />', () => {
  let testContext;
  let ProvidedCredits;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    ProvidedCredits = (props) => (
      <ChartContext.Provider value={{ getChart }}>
        <Credits {...props} />
      </ChartContext.Provider>
    )

  });

  describe('when mounted', () => {
    it('add credits using the Highcharts addCredits method', () => {
      mount(<ProvidedCredits>github.com</ProvidedCredits>);
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        enabled: true,
        text: 'github.com'
      }), true);
    });

    it('addCreditss the credits with the passed props', () => {
      mount(
        <ProvidedCredits href="https://www.github.com">github.com</ProvidedCredits>
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
        <ProvidedCredits href="https://www.github.com">github.com</ProvidedCredits>
      );
      wrapper.setProps({ href: 'https://www.github.com/whawker' });
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        href: 'https://www.github.com/whawker'
      }), true);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Credits', () => {
      const wrapper = mount(<ProvidedCredits>github.com</ProvidedCredits>);
      wrapper.unmount();
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(expect.objectContaining({
        enabled: false
      }), true);
    });
  });
});
