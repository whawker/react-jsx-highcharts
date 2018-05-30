import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Legend from '../../../src/components/Legend/Legend';

describe('<Legend />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('add legend using the Highcharts update method', function () {
      mount(<Legend {...this.propsFromProviders} />);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          enabled: true
        }
      });
    });

    it('updates the legend with the passed props', function () {
      mount(
        <Legend align="left" y={20} {...this.propsFromProviders} />
      );
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          enabled: true,
          align: 'left',
          y: 20
        }
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Legend {...this.propsFromProviders} />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          backgroundColor: 'red'
        }
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the Legend', function () {
      const wrapper = mount(<Legend {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          enabled: false
        }
      })
    });
  });
});
