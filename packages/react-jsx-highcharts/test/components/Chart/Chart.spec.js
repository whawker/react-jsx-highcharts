import React from 'react';
import { createMockProvidedChart, Highcharts } from '../../test-utils'
import Chart from '../../../src/components/Chart/Chart';

describe('<Chart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart,
      needsRedraw,
      getHighcharts: () => Highcharts
    };
  });

  describe('when mounted', () => {
    it('updates the chart config with the provided props', () => {
      mount(<Chart type="bubble" {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart : {
          type: 'bubble'
        }
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('updates the chart with all props that don\'t look like event handlers', () => {
      mount(
        <Chart type="spline" propFoo="bar" zoomType="x" onClick={() => {}} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart : {
          type: 'spline',
          zoomType: 'x',
          propFoo: 'bar'
        }
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('sets the size of the chart using the width and height props', () => {
      mount(<Chart type="line" width={400} height='75%' {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(400, '75%');
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      testContext.chartStubs.object = 'mock-chart';
      const handleClick = jest.fn();
      const handleRender = jest.fn();
      const handleBeforePrint = jest.fn();

      mount(
        <Chart type="area" onClick={handleClick} onRender={handleRender} onBeforePrint={handleBeforePrint}
          {...testContext.propsFromProviders} />
      );
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'click', handleClick);
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'render', handleRender);
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'beforePrint', handleBeforePrint);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <Chart {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart: {
          backgroundColor: 'red'
        }
      }, false);
      expect(testContext.propsFromProviders.needsRedraw).toHaveBeenCalledTimes(2);
    });

    it('updates the size of the chart if the width or height change', () => {
      const wrapper = mount(<Chart width={400} height='75%' {...testContext.propsFromProviders} />);

      wrapper.setProps({ height: '65%' });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(400, '65%');

      wrapper.setProps({ width: 550 });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(550, '65%');

      wrapper.setProps({ width: 600, height: 400 });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(600, 400);
    });
  });
});
