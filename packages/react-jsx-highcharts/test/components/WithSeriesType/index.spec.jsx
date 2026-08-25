import * as React from 'react';
import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

import { render } from '@testing-library/react';

import {
  HighchartsChart,
  Chart,
  YAxis,
  XAxis,
  HighchartsProvider
} from '../../../src';

import withSeriesType from '../../../src/components/WithSeriesType';

import ContextSpy from '../../ContextSpy';

describe('withSeriesType', () => {
  let ChartComponent;
  let seriesRef;
  beforeEach(() => {
    seriesRef = {};

    ChartComponent = ({ children }) => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <Chart zoomType="x" />
            <XAxis></XAxis>
            <YAxis>{children}</YAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };
  });

  it('should create Series component', () => {
    const SeriesComponent = withSeriesType('line');
    render(
      <ChartComponent>
        <SeriesComponent>
          <ContextSpy seriesRef={seriesRef} />
        </SeriesComponent>
      </ChartComponent>
    );

    expect(seriesRef.current.object).toBeDefined();
  });

  it(`should set type attribute for the series`, () => {
    const SeriesComponent = withSeriesType('column');
    render(
      <ChartComponent>
        <SeriesComponent>
          <ContextSpy seriesRef={seriesRef} />
        </SeriesComponent>
      </ChartComponent>
    );

    expect(seriesRef.current.object.type).toBe('column');
  });

  it(`the created component should pass additional props through to Series`, () => {
    const SeriesComponent = withSeriesType('line');
    const data = [1, 2, 3, 4];
    render(
      <ChartComponent>
        <SeriesComponent data={data}>
          <ContextSpy seriesRef={seriesRef} />
        </SeriesComponent>
      </ChartComponent>
    );

    expect(seriesRef.current.object.userOptions.data).toBe(data);
  });

  it(`should pass additionalProps to Series`, () => {
    const SeriesComponent = withSeriesType('line', { visible: false });
    const data = [1, 2, 3, 4];
    render(
      <ChartComponent>
        <SeriesComponent data={data}>
          <ContextSpy seriesRef={seriesRef} />
        </SeriesComponent>
      </ChartComponent>
    );

    expect(seriesRef.current.object.visible).toBe(false);
  });
});
