import React from 'react';
import { createMockProvidedChart, Highcharts } from '../../test-utils'
import Chart from '../../../src/components/Chart/Chart';
import ChartContext from '../../../src/components/ChartContext';
import HighchartsContext from '../../../src/components/HighchartsContext';

describe('<Chart />', () => {
  let testContext;
  let ProvidedChart;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;

    ProvidedChart = (props) => (
      <HighchartsContext.Provider value={() => Highcharts}>
        <ChartContext.Provider value={ chartStubs }>
          <Chart {...props}/>
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    )
  });

  describe('when mounted', () => {
    it('updates the chart config with the provided props', () => {
      mount(<ProvidedChart type="bubble" />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart : {
          type: 'bubble'
        }
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('updates the chart with all props that don\'t look like event handlers', () => {
      mount(
        <ProvidedChart type="spline" propFoo="bar" zoomType="x" onClick={() => {}} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart : {
          type: 'spline',
          zoomType: 'x',
          propFoo: 'bar'
        }
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('sets the size of the chart using the width and height props', () => {
      mount(<ProvidedChart type="line" width={400} height='75%' />);
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(400, '75%');
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      testContext.chartStubs.object = 'mock-chart';
      const handleClick = jest.fn();
      const handleRender = jest.fn();
      const handleBeforePrint = jest.fn();

      mount(
        <ProvidedChart type="area" onClick={handleClick} onRender={handleRender} onBeforePrint={handleBeforePrint}
          />
      );
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'click', handleClick);
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'render', handleRender);
      expect(Highcharts.addEvent).toHaveBeenCalledWith('mock-chart', 'beforePrint', handleBeforePrint);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <ProvidedChart />
      );
      wrapper.setProps({ backgroundColor: 'red' });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        chart: {
          backgroundColor: 'red'
        }
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });

    it('updates the size of the chart if the width or height change', () => {
      const wrapper = mount(<ProvidedChart width={400} height='75%' />);

      wrapper.setProps({ height: '65%' });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(400, '65%');

      wrapper.setProps({ width: 550 });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(550, '65%');

      wrapper.setProps({ width: 600, height: 400 });
      expect(testContext.chartStubs.setSize).toHaveBeenCalledWith(600, 400);
    });
  });
});
