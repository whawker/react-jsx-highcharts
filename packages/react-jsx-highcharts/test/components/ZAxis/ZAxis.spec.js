import * as React from 'react';
import Highcharts from 'highcharts';
import 'highcharts/highcharts-3d';

import 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { Highcharts3dChart, HighchartsProvider } from '../../../src';
import ZAxis from '../../../src/components/ZAxis/ZAxis';
import ContextSpy from '../../ContextSpy';

describe('<ZAxis /> integration', () => {
  it('creates chart zaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <Highcharts3dChart>
            <ZAxis>
              <ContextSpy chartRef={chartRef} />
            </ZAxis>
          </Highcharts3dChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('zAxis');
    expect(axis).toBeDefined();
    expect(axis.isXAxis).toBe(false);
  });

  it('should always have the id `zAxis`', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <Highcharts3dChart>
            <ZAxis id="customaxis">
              <ContextSpy chartRef={chartRef} />
            </ZAxis>
          </Highcharts3dChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    let axis = chartRef.current.object.get('customaxis');
    expect(axis).not.toBeDefined();
    axis = chartRef.current.object.get('zAxis');
    expect(axis).toBeDefined();
  });

  it('passes props to created zaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <Highcharts3dChart>
            <ZAxis tickLength={1337}>
              <ContextSpy chartRef={chartRef} />
            </ZAxis>
          </Highcharts3dChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('zAxis');
    expect(axis.userOptions.tickLength).toBe(1337);
  });
});
