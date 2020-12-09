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

describe('<NavigatorXAxis /> integration', () => {
  describe('when mounted', () => {
    it('passes additional props to navigators xAxis', () => {
      const data = [1, 2, 3, 4, 5];
      const labels = { x: 0, y: 12 };
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
              <Navigator>
                <Navigator.XAxis labels={labels} />
              </Navigator>
            </HighchartsStockChart>
          </HighchartsProvider>
        );
      };
      render(<Component />);
      const chart = window.chart;
      const navigatorxaxis = chart.get('navigator-x-axis');

      expect(navigatorxaxis.options.labels).toEqual(
        expect.objectContaining(labels)
      );
    });
  });

  describe('when updated', () => {
    it('changes the navigator labels', () => {
      const data = [1, 2, 3, 4, 5];
      const labels = { x: 0, y: 12 };
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
              <Navigator>
                <Navigator.XAxis {...props} />
              </Navigator>
            </HighchartsStockChart>
          </HighchartsProvider>
        );
      };

      const wrapper = render(<Component />);
      wrapper.rerender(<Component labels={labels} />);
      const chart = window.chart;
      const navigatorxaxis = chart.get('navigator-x-axis');

      expect(navigatorxaxis.options.labels).toEqual(
        expect.objectContaining(labels)
      );
    });
  });
});
