import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Options3d from '../../../src/components/Options3d/Options3d';
import ChartContext from '../../../src/components/ChartContext';

describe('<Options3d />', () => {
  let testContext;
  let ProvidedOptions3d;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    ProvidedOptions3d = props => (
      <ChartContext.Provider value={{getChart}}>
        <Options3d {...props} />
      </ChartContext.Provider>
    )

  });

  describe('when mounted', () => {
    it('updates the chart with the passed props', () => {
      mount(<ProvidedOptions3d alpha={10} beta={20} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 10,
            beta: 20
          }
        }
      }, true);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<ProvidedOptions3d alpha={0} />);
      wrapper.setProps({ alpha: 45 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart: {
          options3d: {
            ...Options3d.defaultProps,
            enabled: true,
            alpha: 45
          }
        }
      }, true);
    });
  });
});
