import * as React from 'react';
import Highcharts from 'highcharts';
import addColorAxis from 'highcharts/modules/coloraxis';
import { HighchartsChart, withHighcharts } from '../../../src';
import Chart from '../../../src/components/Chart';
import ColorAxis from '../../../src/components/ColorAxis';
import Series from '../../../src/components/Series';
import YAxis from '../../../src/components/YAxis';
import XAxis from '../../../src/components/XAxis';
import ContextSpy from '../../ContextSpy';

addColorAxis(Highcharts);

describe('<ColorAxis /> integration', () => {
  let chartRef;

  beforeEach(() => {
    chartRef = {};
  });

  describe('when mounted', () => {
    it('renders series with correct coloraxis', () => {
      const data = [
        { y: 1, colorValue: 0 },
        { y: 10, colorValue: 10 }
      ];
      const Component = props => {
        return (
          <HighchartsChart>
            <ContextSpy chartRef={chartRef} />
            <Chart />
            <XAxis />
            <ColorAxis min={10} max={100} />
            <ColorAxis id="testcoloraxis" min={0} max={10}>
              <YAxis>
                <Series colorKey="colorValue" type="column" data={data} />
              </YAxis>
            </ColorAxis>
            <ColorAxis min={5} max={50} />
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      mount(<WithComponent />);
      const chart = chartRef.current.object;
      const colorAxis = chart.colorAxis.find(
        c => c.options.id === 'testcoloraxis'
      );
      expect(colorAxis).toBeDefined();
      expect(colorAxis.options.min).toEqual(0);
      expect(colorAxis.options.max).toEqual(10);

      const series = chart.series[0];
      expect(series.colorAxis.options.id).toEqual('testcoloraxis');
    });

    it('renders series with correct coloraxis outside context', () => {
      const data = [
        { y: 1, colorValue: 0 },
        { y: 10, colorValue: 10 }
      ];
      const Component = props => {
        return (
          <HighchartsChart>
            <ContextSpy chartRef={chartRef} />
            <Chart />
            <XAxis />
            <ColorAxis min={10} max={100} />
            <ColorAxis id="testcoloraxis" min={0} max={10} />
            <YAxis>
              <Series
                colorAxis="testcoloraxis"
                colorKey="colorValue"
                type="column"
                data={data}
              />
            </YAxis>
            <ColorAxis min={5} max={50} />
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      mount(<WithComponent />);
      const chart = chartRef.current.object;
      const colorAxis = chart.colorAxis.find(
        c => c.options.id === 'testcoloraxis'
      );
      expect(colorAxis).toBeDefined();
      expect(colorAxis.options.min).toEqual(0);
      expect(colorAxis.options.max).toEqual(10);

      const series = chart.series[0];
      expect(series.colorAxis.options.id).toEqual('testcoloraxis');
    });
  });

  describe('when updated', () => {
    it('updates colorAxis options', () => {
      const data = [
        { y: 1, colorValue: 0 },
        { y: 10, colorValue: 10 }
      ];
      const Component = ({ min, max }) => {
        return (
          <HighchartsChart>
            <ContextSpy chartRef={chartRef} />
            <Chart />
            <XAxis />
            <ColorAxis id="testcoloraxis" min={min} max={max}>
              <YAxis>
                <Series colorKey="colorValue" type="column" data={data} />
              </YAxis>
            </ColorAxis>
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      const wrapper = mount(<WithComponent min={0} max={10} />);
      wrapper.setProps({ min: 1 });
      const chart = chartRef.current.object;
      const colorAxis = chart.colorAxis.find(
        c => c.options.id === 'testcoloraxis'
      );
      expect(colorAxis.options.min).toEqual(1);
    });
  });

  describe('when unmounted', () => {
    it('removes colorAxis from chart', () => {
      const data = [
        { y: 1, colorValue: 0 },
        { y: 10, colorValue: 10 }
      ];
      const Component = ({ mountColorAxis = true }) => {
        return (
          <HighchartsChart>
            <ContextSpy chartRef={chartRef} />
            <Chart />
            <XAxis />
            {mountColorAxis ? (
              <ColorAxis id="testcoloraxis" min={0} max={10}></ColorAxis>
            ) : null}
            <YAxis>
              <Series
                colorAxisId="testcoloraxis"
                colorKey="colorValue"
                type="column"
                data={data}
              />
            </YAxis>
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      const wrapper = mount(<WithComponent min={0} max={10} />);
      wrapper.setProps({ mountColorAxis: false });
      const chart = chartRef.current.object;
      const colorAxis = chart.colorAxis.find(
        c => c.options.id === 'testcoloraxis'
      );
      expect(colorAxis).not.toBeDefined();
    });
  });
});
