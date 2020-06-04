import * as React from 'react';
import Highstock from 'highcharts/highstock';
import {
  Chart,
  Debug,
  XAxis,
  YAxis,
  LineSeries,
  withHighcharts
} from 'react-jsx-highcharts';
import { HighchartsStockChart, Navigator } from '../../../src';

describe('<Navigator /> integration', () => {
  describe('when mounted', () => {
    it('creates navigator on chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsStockChart>
            <Debug />
            <Chart />
            <XAxis />
            <YAxis>
              <LineSeries data={data} />
            </YAxis>
            <Navigator />
          </HighchartsStockChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highstock);
      mount(<WithComponent />);
      const chart = window.chart;

      expect(chart.options.navigator.enabled).toEqual(true);
    });

    it('passed additional props to navigator on chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsStockChart>
            <Debug />
            <Chart />
            <XAxis />
            <YAxis>
              <LineSeries data={data} />
            </YAxis>
            <Navigator height={100} />
          </HighchartsStockChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highstock);
      mount(<WithComponent />);
      const chart = window.chart;

      expect(chart.options.navigator.height).toEqual(100);
    });
  });

  describe('when updated', () => {
    it('changes height of the chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsStockChart>
            <Debug />
            <Chart />
            <XAxis />
            <YAxis>
              <LineSeries data={data} />
            </YAxis>
            <Navigator {...props} />
          </HighchartsStockChart>
        );
      };

      const WithComponent = withHighcharts(Component, Highstock);
      const wrapper = mount(<WithComponent />);
      wrapper.setProps({ height: 110 });
      const chart = window.chart;
      expect(chart.options.navigator.height).toEqual(110);
    });
  });
});
