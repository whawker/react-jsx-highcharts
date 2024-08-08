import * as React from 'react';
import Highmaps from 'highcharts/highmaps';
import addAccessibility from 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { HighchartsMapChart, HighmapsProvider } from '../../../src';
import MapXAxis from '../../../src/components/XAxis';
import ContextSpy from '../../ContextSpy';

addAccessibility(Highmaps);

describe('<XAxis /> integration', () => {
  it('creates map yaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapXAxis>
              <ContextSpy chartRef={chartRef} />
            </MapXAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('xAxis');
    expect(axis).toBeDefined();
    expect(axis.isXAxis).toBe(true);
  });

  it('should always have the id `xAxis`', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapXAxis id="customaxis">
              <ContextSpy chartRef={chartRef} />
            </MapXAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    let axis = chartRef.current.object.get('customaxis');
    expect(axis).not.toBeDefined();
    axis = chartRef.current.object.get('xAxis');
    expect(axis).toBeDefined();
  });

  it('passes props to created xaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapXAxis tickLength={1337}>
              <ContextSpy chartRef={chartRef} />
            </MapXAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('xAxis');
    expect(axis.userOptions.tickLength).toBe(1337);
  });
});
