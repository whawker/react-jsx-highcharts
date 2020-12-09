import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart, Highcharts } from '../../test-utils';
import Credits from '../../../src/components/Credits/Credits';
import ChartContext from '../../../src/components/ChartContext';

describe('<Credits />', () => {
  let testContext;
  let ProvidedCredits;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    ProvidedCredits = props => (
      <ChartContext.Provider value={chartStubs}>
        <Credits {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('add credits using the Highcharts addCredits method', () => {
      render(<ProvidedCredits>github.com</ProvidedCredits>);
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(
        {
          enabled: true,
          text: 'github.com'
        },
        true
      );
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledTimes(1);
    });

    it('addCreditss the credits with the passed props', () => {
      render(
        <ProvidedCredits href="https://www.github.com">
          github.com
        </ProvidedCredits>
      );
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(
        {
          enabled: true,
          href: 'https://www.github.com',
          text: 'github.com'
        },
        true
      );
    });
  });

  describe('addCredits', () => {
    it('should use the addCredits method when props change', () => {
      const wrapper = render(
        <ProvidedCredits href="https://www.github.com">
          github.com
        </ProvidedCredits>
      );

      wrapper.rerender(
        <ProvidedCredits href="https://www.github.com/whawker">
          github.com
        </ProvidedCredits>
      );

      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(
        {
          href: 'https://www.github.com/whawker'
        },
        true
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the Credits', () => {
      const wrapper = render(<ProvidedCredits>github.com</ProvidedCredits>);
      wrapper.unmount();
      expect(testContext.chartStubs.addCredits).toHaveBeenCalledWith(
        {
          enabled: false
        },
        true
      );
    });
  });
});
