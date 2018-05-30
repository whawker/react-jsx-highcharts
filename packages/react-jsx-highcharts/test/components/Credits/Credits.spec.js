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
    it('add credits using the Highcharts update method', function () {
      mount(<Credits {...this.propsFromProviders}>github.com</Credits>);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        credits: {
          enabled: true,
          text: 'github.com'
        }
      });
    });

    it('updates the credits with the passed props', function () {
      mount(
        <Credits href="https://www.github.com" {...this.propsFromProviders}>github.com</Credits>
      );
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        credits: {
          enabled: true,
          href: 'https://www.github.com',
          text: 'github.com'
        }
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Credits href="https://www.github.com" {...this.propsFromProviders}>github.com</Credits>
      );
      wrapper.setProps({ href: 'https://www.github.com/whawker' });
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        credits: {
          href: 'https://www.github.com/whawker'
        }
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the Credits', function () {
      const wrapper = mount(<Credits {...this.propsFromProviders}>github.com</Credits>);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        credits: {
          enabled: false
        }
      })
    });
  });
});
