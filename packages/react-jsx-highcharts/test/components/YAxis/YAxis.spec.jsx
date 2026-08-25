import * as React from 'react';
import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { HighchartsChart, HighchartsProvider } from '../../../src';
import YAxis from '../../../src/components/YAxis';
import ContextSpy from '../../ContextSpy';

describe('<YAxis /> integration', () => {
  it('creates chart yaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <YAxis id="testYAxis">
              <ContextSpy chartRef={chartRef} />
            </YAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('testYAxis');
    expect(axis).toBeDefined();
    expect(axis.isXAxis).toBe(false);
  });

  it('passes props to created yaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <YAxis id="testYAxis" tickLength={1337}>
              <ContextSpy chartRef={chartRef} />
            </YAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('testYAxis');
    expect(axis.userOptions.tickLength).toBe(1337);
  });
});
