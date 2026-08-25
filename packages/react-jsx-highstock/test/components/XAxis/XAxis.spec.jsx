import * as React from 'react';
import Highcharts from 'highcharts/highstock';
import 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { HighchartsStockChart, HighchartsProvider, XAxis } from '../../../src';
import ContextSpy from '../../ContextSpy';

describe('<XAxis /> integration', () => {
  it('renders the an <Axis type="datetime" /> if no type specified', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsStockChart>
            <XAxis>
              <ContextSpy chartRef={chartRef} />
            </XAxis>
          </HighchartsStockChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('xAxis');
    expect(axis).toBeDefined();
    expect(axis.userOptions.type).toBe('datetime');
  });

  it('uses the id `xAxis` even if an id prop is provided', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsStockChart>
            <XAxis id="customaxis">
              <ContextSpy chartRef={chartRef} />
            </XAxis>
          </HighchartsStockChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    let axis = chartRef.current.object.get('customaxis');
    expect(axis).not.toBeDefined();
    axis = chartRef.current.object.get('xAxis');
    expect(axis).toBeDefined();
  });
});
