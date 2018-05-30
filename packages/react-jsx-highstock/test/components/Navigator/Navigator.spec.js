import React from 'react';
import Navigator from '../../../src/components/Navigator/Navigator';
import { Highcharts, createMockProvidedChart } from '../../test-utils';

describe('<Navigator />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.object = {
      options: { navigator: { enabled: false } }
    };
    const { chartStubs, getChart } = createMockProvidedChart({ object: this.object });
    this.chartStubs = chartStubs;

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'fireEvent');

    this.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('enables the Navigator', function () {
      mount(<Navigator {...this.propsFromProviders} />);
      expect(this.object.options.navigator.enabled).to.equal(true);
    });

    it('fires the `beforeRender` event to so Highcharts creates a Navigator', function () {
      mount(<Navigator {...this.propsFromProviders} />);
      expect(Highcharts.fireEvent).to.have.been.calledWith(this.object, 'beforeRender');
    });

    it('updates the chart with the passed props', function () {
      mount(<Navigator height={100} maskFill="rgba(1,2,3,0.45)" {...this.propsFromProviders} />);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        navigator: {
          enabled: true,
          height: 100,
          maskFill: 'rgba(1,2,3,0.45)'
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Navigator {...this.propsFromProviders} />);
      wrapper.setProps({ maskInside: false });
      expect(this.chartStubs.update).to.have.been.calledWith({
        navigator: {
          maskInside: false
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Navigator', function () {
      const wrapper = mount(<Navigator {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWith({
        navigator: {
          enabled: false
        }
      })
    });
  });
});
