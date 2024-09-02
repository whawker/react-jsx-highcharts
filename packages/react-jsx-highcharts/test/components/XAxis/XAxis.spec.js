import * as React from 'react';
import Highcharts from 'highcharts/highstock';
import addAccessibility from 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import { HighchartsChart, HighchartsProvider, XAxis } from '../../../src';
import ContextSpy from '../../ContextSpy';

addAccessibility(Highcharts);

describe('<XAxis />', () => {
  it('creates an chart xaxis', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <XAxis id="myAxis">
              <ContextSpy chartRef={chartRef} />
            </XAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('myAxis');
    expect(axis).toBeDefined();
    expect(axis.isXAxis).toBeDefined();
  });

  it('passes other props through to <Axis />', () => {
    let chartRef = {};
    const Component = () => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <XAxis id="myAxis" tickLength={1337}>
              <ContextSpy chartRef={chartRef} />
            </XAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };

    render(<Component />);

    const axis = chartRef.current.object.get('myAxis');
    expect(axis).toBeDefined();
    expect(axis.userOptions.tickLength).toBe(1337);
  });

  describe('Highcharts chart', () => {
    it('renders the <Axis /> type if provided', () => {
      let chartRef = {};
      const Component = () => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <XAxis id="myAxis" type="logarithmic">
                <ContextSpy chartRef={chartRef} />
              </XAxis>
            </HighchartsChart>
          </HighchartsProvider>
        );
      };

      render(<Component />);

      const axis = chartRef.current.object.get('myAxis');
      expect(axis).toBeDefined();
      expect(axis.isXAxis).toBe(true);
      expect(axis.userOptions.type).toBe('logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', () => {
      let chartRef = {};
      const Component = () => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <XAxis id="myAxis">
                <ContextSpy chartRef={chartRef} />
              </XAxis>
            </HighchartsChart>
          </HighchartsProvider>
        );
      };

      render(<Component />);

      const axis = chartRef.current.object.get('myAxis');
      expect(axis).toBeDefined();
      expect(axis.userOptions.type).toBe('linear');
    });
  });
});
