import * as React from 'react';
import Highcharts from 'highcharts';
import ContextSpy from '../../ContextSpy';

import 'highcharts/modules/accessibility';

import 'highcharts/highcharts-more';
//import 'highcharts/highcharts-3d';
import 'highcharts/modules/bullet';
import 'highcharts/modules/funnel';
//impor 'highcharts/modules/cylinder';
import 'highcharts/modules/heatmap';
//import 'highcharts/modules/histogram-bellcurve';
import 'highcharts/modules/networkgraph';
//import 'highcharts/modules/pareto';
import 'highcharts/modules/sankey';
import 'highcharts/modules/solid-gauge';
import 'highcharts/modules/streamgraph';
import 'highcharts/modules/sunburst';
import 'highcharts/modules/tilemap';
import 'highcharts/modules/treemap';
import 'highcharts/modules/variable-pie';
import 'highcharts/modules/variwide';
import 'highcharts/modules/vector';
import 'highcharts/modules/venn';
import 'highcharts/modules/datagrouping';
import 'highcharts/modules/windbarb';
import 'highcharts/modules/xrange';

import { render } from '@testing-library/react';

import {
  HighchartsChart,
  Chart,
  YAxis,
  XAxis,
  HighchartsProvider
} from '../../../src';

import * as all from '../../../src';

const skippedSeries = ['BarSeries'];
const noAxisSeries = [
  'PieSeries',
  'VariablePieSeries',
  'PyramidSeries',
  'FunnelSeries',
  'VennSeries',
  'PackedBubbleSeries',
  'SunburstSeries'
];
//const needParentSeries = ['BellCurveSeries', 'HistogramSeries', 'ParetoSeries'];

Object.keys(all)
  .filter(name => /^[A-Z].*Series$/.test(name))
  .forEach(seriesName => {
    if (skippedSeries.includes(seriesName)) return;
    const seriesType = seriesName
      .substring(0, seriesName.indexOf('Series'))
      .toLowerCase();
    const SeriesComponent = all[seriesName]; // eslint-disable-line import/namespace

    describe(`<${seriesName} /> integration`, () => {
      if (seriesType in Highcharts.seriesTypes) {
        it('renders with real highcharts', () => {
          const seriesRef = {};

          const Component = () => {
            return (
              <React.StrictMode>
                <HighchartsProvider Highcharts={Highcharts}>
                  <HighchartsChart>
                    <Chart zoomType="x" />
                    <XAxis></XAxis>
                    <YAxis id="myYAxis"></YAxis>
                    <SeriesComponent axisId="myYAxis" data={[1, 2, 3, 4]}>
                      <ContextSpy seriesRef={seriesRef} />
                    </SeriesComponent>
                  </HighchartsChart>
                </HighchartsProvider>
              </React.StrictMode>
            );
          };
          render(<Component />);
          expect(seriesRef.current.object.type).toEqual(seriesType);
          if (!noAxisSeries.includes(seriesName)) {
            expect(seriesRef.current.object.yAxis.userOptions.id).toBe(
              'myYAxis'
            );
          } else {
            expect(seriesRef.current.object.yAxis).not.toBeDefined();
          }
        });

        it('passes props to series', () => {
          const seriesRef = {};

          const Component = () => {
            return (
              <React.StrictMode>
                <HighchartsProvider Highcharts={Highcharts}>
                  <HighchartsChart>
                    <Chart zoomType="x" />
                    <XAxis></XAxis>
                    <YAxis>
                      <SeriesComponent data={[1, 2, 3, 4]} zIndex={-1}>
                        <ContextSpy seriesRef={seriesRef} />
                      </SeriesComponent>
                    </YAxis>
                  </HighchartsChart>
                </HighchartsProvider>
              </React.StrictMode>
            );
          };

          render(<Component />);
          const seriesObj = seriesRef.current.object;
          expect(seriesObj.userOptions.data).toEqual([1, 2, 3, 4]);
          expect(seriesObj.userOptions.zIndex).toEqual(-1);
        });

        it('binds hide event correctly', () => {
          const seriesRef = {};
          const onHide = jest.fn();

          const Component = () => {
            return (
              <React.StrictMode>
                <HighchartsProvider Highcharts={Highcharts}>
                  <HighchartsChart>
                    <Chart zoomType="x" />
                    <XAxis></XAxis>
                    <YAxis>
                      <SeriesComponent data={[1, 2, 3, 4]} onHide={onHide}>
                        <ContextSpy seriesRef={seriesRef} />
                      </SeriesComponent>
                    </YAxis>
                  </HighchartsChart>
                </HighchartsProvider>
              </React.StrictMode>
            );
          };

          render(<Component />);
          const seriesObj = seriesRef.current.object;
          expect(seriesObj.visible).toEqual(true);
          seriesObj.hide();
          expect(onHide).toHaveBeenCalled();
          expect(seriesObj.visible).toEqual(false);
        });
      }
    });
  });
