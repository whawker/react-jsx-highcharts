import * as React from 'react';
import { render } from '@testing-library/react';
import Highstock from 'highcharts/highstock';
import 'highcharts/modules/accessibility';
import {
  Chart,
  XAxis,
  YAxis,
  LineSeries,
  HighchartsProvider
} from 'react-jsx-highcharts';

import ContextSpy from '../../ContextSpy';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import RangeSelectorButton from '../../../src/components/RangeSelector/RangeSelectorButton';

describe('<RangeSelectorButton />', () => {
  const data = [1, 2, 3, 4, 5];

  const Component = ({ chartRef, showButton = true }) => (
    <HighchartsProvider Highcharts={Highstock}>
      <HighchartsStockChart>
        <ContextSpy chartRef={chartRef} />
        <Chart />
        <XAxis />
        <YAxis>
          <LineSeries data={data} />
        </YAxis>
        <RangeSelector>
          {showButton && (
            <RangeSelectorButton count={5} type="day">
              5d
            </RangeSelectorButton>
          )}
        </RangeSelector>
      </HighchartsStockChart>
    </HighchartsProvider>
  );

  describe('when mounted', () => {
    it('creates button on rangeselector', () => {
      let chartRef = {};

      render(<Component chartRef={chartRef} />);

      const chart = chartRef.current.object;
      expect(chart.options.rangeSelector.buttons[0].type).toBe('day');
      expect(chart.options.rangeSelector.buttons[0].count).toBe(5);
      expect(chart.options.rangeSelector.buttons[0].text).toBe('5d');
    });
  });
  describe('when unmounted', () => {
    it('removes button from rangeselector', () => {
      let chartRef = {};

      const wrapper = render(
        <Component chartRef={chartRef} showButton={true} />
      );

      wrapper.rerender(<Component chartRef={chartRef} showButton={false} />);

      const chart = chartRef.current.object;
      expect(chart.options.rangeSelector.buttons).toEqual([]);
    });
  });
});
