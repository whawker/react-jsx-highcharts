import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Options3d from '../../../src/components/Options3d/Options3d';

describe('<Options3d />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('updates the chart with the passed props', function () {
      mount(<Options3d alpha={10} beta={20} {...this.propsFromProviders} />);
      expect(this.chartStubs.update).to.have.been.calledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 10,
            beta: 20
          }
        }
      });
    });
  });

  context('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Options3d alpha={0} {...this.propsFromProviders} />);
      wrapper.setProps({ alpha: 45 });
      expect(this.chartStubs.update).to.have.been.calledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 45
          }
        }
      });
    });
  });
});
