import * as React from 'react';
import { render } from '@testing-library/react';

import Highstock from 'highcharts/highstock';
import {
  Chart,
  Debug,
  XAxis,
  YAxis,
  LineSeries,
  HighchartsProvider
} from 'react-jsx-highcharts';
import { HighchartsStockChart, Navigator } from '../../../src';

describe('<Navigator /> integration', () => {
  describe('when mounted', () => {
    it('creates navigator on chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsProvider Highcharts={Highstock}>
            <HighchartsStockChart>
              <Debug />
              <Chart />
              <XAxis />
              <YAxis>
                <LineSeries data={data} />
              </YAxis>
              <Navigator />
            </HighchartsStockChart>
          </HighchartsProvider>
        );
      };
      render(<Component />);
      const chart = window.chart;

      expect(chart.options.navigator.enabled).toEqual(true);
    });

    it('passed additional props to navigator on chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsProvider Highcharts={Highstock}>
            <HighchartsStockChart>
              <Debug />
              <Chart />
              <XAxis />
              <YAxis>
                <LineSeries data={data} />
              </YAxis>
              <Navigator height={100} />
            </HighchartsStockChart>
          </HighchartsProvider>
        );
      };
      render(<Component />);
      const chart = window.chart;

      expect(chart.options.navigator.height).toEqual(100);
    });
  });

  describe('when updated', () => {
    it('changes height of the chart', () => {
      const data = [1, 2, 3, 4, 5];
      const Component = props => {
        return (
          <HighchartsProvider Highcharts={Highstock}>
            <HighchartsStockChart>
              <Debug />
              <Chart />
              <XAxis />
              <YAxis>
                <LineSeries data={data} />
              </YAxis>
              <Navigator {...props} />
            </HighchartsStockChart>
          </HighchartsProvider>
        );
      };

      const wrapper = render(<Component />);
      wrapper.rerender(<Component height={110} />);
      const chart = window.chart;

      expect(chart.options.navigator.height).toEqual(110);
    });
  });
});
