import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';

import Highmaps from 'highcharts/highmaps';

import { HighmapsProvider } from '../../../src';
import HighchartsMapChart from '../../../src/components/HighchartsMapChart/HighchartsMapChart';
import ContextSpy from '../../ContextSpy';

describe('<HighchartsMapChart />', () => {
  let chartRef;
  let MapChart;
  beforeEach(() => {
    chartRef = { current: null };
    MapChart = props => (
      <HighmapsProvider Highcharts={Highmaps}>
        <HighchartsMapChart {...props}>
          <ContextSpy chartRef={chartRef} />
        </HighchartsMapChart>
      </HighmapsProvider>
    );
  });

  it('creates a chart with the correct chart type', () => {
    render(<MapChart />);

    expect(chartRef.current.type).toBe('mapChart');
  });

  it('creates a chart with GeoJSON from a string', () => {
    const mockMap = {
      type: 'Feature'
    };
    Highmaps.maps['mock/map'] = mockMap;

    render(<MapChart map="mock/map" />);

    expect(chartRef.current.object.options.chart.map).toEqual(mockMap);
  });

  it('creates a chart with direct GeoJSON', () => {
    const geoJSON = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [125.6, 10.1]
      }
    };
    render(<MapChart map={geoJSON} />);

    expect(chartRef.current.object.options.chart.map).toEqual(geoJSON);
  });

  it('passes other props through to chart', () => {
    const plotOptions = { map: { animation: false } };
    render(<MapChart plotOptions={plotOptions} />);

    expect(chartRef.current.object.userOptions.plotOptions).toEqual(
      plotOptions
    );
  });

  it('return a chart instance to the callback prop', () => {
    let cbChart;
    const chartCallback = returnedChart => {
      cbChart = returnedChart;
    };
    render(<MapChart callback={chartCallback} />);
    expect(cbChart).toBeDefined();
  });
});
