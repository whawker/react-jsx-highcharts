import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Pane from '../../../src/components/Pane/Pane';

describe('<Pane />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('set Pane options using the Highcharts update method', function () {
      mount(
        <Pane center={['50%', '85%']} size='100%' {...this.propsFromProviders} />
      );
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        pane: {
          center: ['50%', '85%'],
          size: '100%'
        }
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Pane {...this.propsFromProviders} />
      );
      wrapper.setProps({ size: '50%' });
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        pane: {
          size: '50%'
        }
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the Pane', function () {
      const wrapper = mount(<Pane {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        pane: {}
      })
    });
  });
});
