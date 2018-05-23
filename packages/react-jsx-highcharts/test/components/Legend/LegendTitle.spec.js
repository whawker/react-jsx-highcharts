import React from 'react';
import LegendTitle from '../../../src/components/Legend/LegendTitle';
import { createMockProvidedChart } from '../../test-utils'

describe('<Legend.Title />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('add legend using the Highcharts update method', function () {
      mount(<LegendTitle {...this.propsFromProviders}>My Legend Title</LegendTitle>);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          title: {
            text: 'My Legend Title'
          }
        }
      });
    });

    it('updates the legend with the passed props', function () {
      mount(
        <LegendTitle style={{ color: 'red' }} {...this.propsFromProviders}>My Legend Title</LegendTitle>
      );
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          title: {
            text: 'My Legend Title',
            style: { color: 'red' }
          }
        }
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <LegendTitle {...this.propsFromProviders}>My Legend Title</LegendTitle>
      );
      wrapper.setProps({ children: 'My New Legend Title' });
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          title: {
            text: 'My New Legend Title'
          }
        }
      });
    });
  });

  context('when unmounted', function () {
    it('should disable the LegendTitle', function () {
      const wrapper = mount(<LegendTitle {...this.propsFromProviders}>My Legend Title</LegendTitle>);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        legend: {
          title: {
            text: null
          }
        }
      })
    });
  });
});
