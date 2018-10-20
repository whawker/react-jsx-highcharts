import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Options3d from '../../../src/components/Options3d/Options3d';

describe('<Options3d />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
    };
  });

  describe('when mounted', () => {
    it('updates the chart with the passed props', () => {
      mount(<Options3d alpha={10} beta={20} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).to.have.been.calledWith({
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

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<Options3d alpha={0} {...testContext.propsFromProviders} />);
      wrapper.setProps({ alpha: 45 });
      expect(testContext.chartStubs.update).to.have.been.calledWith({
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
