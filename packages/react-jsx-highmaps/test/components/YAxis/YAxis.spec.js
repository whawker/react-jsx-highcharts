import * as React from 'react';
import Highmaps from 'highcharts/highmaps';
import addAccessibility from 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { HighchartsMapChart, HighmapsProvider } from '../../../src';
import MapYAxis from '../../../src/components/YAxis';
import ContextSpy from '../../ContextSpy';

addAccessibility(Highmaps);

describe('<YAxis /> integration', () => {
  it('creates map yaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapYAxis>
              <ContextSpy chartRef={chartRef} />
            </MapYAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('yAxis');
    expect(axis).toBeDefined();
    expect(axis.isXAxis).toBe(false);
  });

  it('should always have the id `yAxis`', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapYAxis id="customaxis">
              <ContextSpy chartRef={chartRef} />
            </MapYAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    let axis = chartRef.current.object.get('customaxis');
    expect(axis).not.toBeDefined();
    axis = chartRef.current.object.get('yAxis');
    expect(axis).toBeDefined();
  });

  it('passes props to created yaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighmapsProvider Highcharts={Highmaps}>
          <HighchartsMapChart>
            <MapYAxis tickLength={1337}>
              <ContextSpy chartRef={chartRef} />
            </MapYAxis>
          </HighchartsMapChart>
        </HighmapsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('yAxis');
    expect(axis.userOptions.tickLength).toBe(1337);
  });
});
