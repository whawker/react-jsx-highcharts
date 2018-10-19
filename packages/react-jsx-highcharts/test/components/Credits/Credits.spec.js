import React from 'react';
import { createMockProvidedChart, Highcharts } from '../../test-utils'
import Credits from '../../../src/components/Credits/Credits';

describe('<Credits />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('add credits using the Highcharts addCredits method', function () {
      mount(<Credits {...this.propsFromProviders}>github.com</Credits>);
      expect(this.chartStubs.addCredits).to.have.been.calledWithMatch({
        enabled: true,
        text: 'github.com'
      });
    });

    it('addCreditss the credits with the passed props', function () {
      mount(
        <Credits href="https://www.github.com" {...this.propsFromProviders}>github.com</Credits>
      );
      expect(this.chartStubs.addCredits).to.have.been.calledWithMatch({
        enabled: true,
        href: 'https://www.github.com',
        text: 'github.com'
      });
    });
  });

  context('addCredits', function () {
    it('should use the addCredits method when props change', function () {
      const wrapper = mount(
        <Credits href="https://www.github.com" {...this.propsFromProviders}>github.com</Credits>
      );
      wrapper.setProps({ href: 'https://www.github.com/whawker' });
      expect(this.chartStubs.addCredits).to.have.been.calledWithMatch({
        href: 'https://www.github.com/whawker'
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the Credits', function () {
      const wrapper = mount(<Credits {...this.propsFromProviders}>github.com</Credits>);
      wrapper.unmount();
      expect(this.chartStubs.addCredits).to.have.been.calledWithMatch({
        enabled: false
      })
    });
  });
});
