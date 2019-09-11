import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Legend from '../../../src/components/Legend/Legend';
import ChartContext from '../../../src/components/ChartContext';



describe('<Legend />', () => {
  let testContext;

  let ProvidedLegend;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();

    ProvidedLegend = props => (
      <ChartContext.Provider value={ chartStubs }>
        <Legend {...props}/>
      </ChartContext.Provider>
    );
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;
  });

  describe('when mounted', () => {
    it('add legend using the Highcharts update method', () => {
      mount(<ProvidedLegend />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        legend: expect.objectContaining({
          enabled: true
        })
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('updates the legend with the passed props', () => {
      mount(
        <ProvidedLegend align="left" y={20} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        legend: expect.objectContaining({
          enabled: true,
          align: 'left',
          y: 20
        })
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <ProvidedLegend />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        legend: {
          backgroundColor: 'red'
        }
      }), false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Legend', () => {
      const wrapper = mount(<ProvidedLegend />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        legend: {
          enabled: false
        }
      }), false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
