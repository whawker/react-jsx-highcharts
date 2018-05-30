import React from 'react';
import { Highcharts, createMockProvidedChart } from '../../test-utils'
import Tooltip from '../../../src/components/Tooltip/Tooltip';

describe('<Tooltip />', function ()  {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'Tooltip');
    sandbox.stub(Highcharts, 'addEvent');

    const { chartStubs, getChart } = createMockProvidedChart();

    this.chartStubs = chartStubs;
    this.chart = {};
    this.chartStubs.object = this.chart;

    this.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  context('when mounted', function () {
    it('creates a new Highcharts Tooltip instance', function () {
      mount(<Tooltip {...this.propsFromProviders} />);
      expect(Highcharts.Tooltip).to.have.been.calledWithNew;
    });

    it('updates the chart with the passed props', function () {
      mount(<Tooltip backgroundColor="red" shadow={false} {...this.propsFromProviders} />);
      expect(Highcharts.Tooltip).to.have.been.calledWithMatch(this.chart, {
        backgroundColor: 'red',
        enabled: true,
        shadow: false
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Tooltip selected={0} {...this.propsFromProviders} />);
      wrapper.setProps({ padding: 2 });
      expect(this.chartStubs.update).to.have.been.calledWith({
        tooltip: {
          padding: 2
        }
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the Tooltip', function () {
      const wrapper = mount(<Tooltip {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWith({
        tooltip: {
          enabled: false
        }
      })
    });
  });
});
