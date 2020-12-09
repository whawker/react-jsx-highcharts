import * as React from 'react';
import Highcharts from 'highcharts';

import addHighchartsMore from 'highcharts/highcharts-more';
//import addHighcharts3DModule from 'highcharts/highcharts-3d';
import addBulletModule from 'highcharts/modules/bullet';
import addFunnelModule from 'highcharts/modules/funnel';
//import addCylinderModule from 'highcharts/modules/cylinder';
import addHeatmapModule from 'highcharts/modules/heatmap';
//import addHistogramBellCurveModule from 'highcharts/modules/histogram-bellcurve';
import addNetworkGraphModule from 'highcharts/modules/networkgraph';
//import addParetoModule from 'highcharts/modules/pareto';
import addSankeyModule from 'highcharts/modules/sankey';
import addSolidGaugeModule from 'highcharts/modules/solid-gauge';
import addStreamGraphModule from 'highcharts/modules/streamgraph';
import addSunburstModule from 'highcharts/modules/sunburst';
import addTilemapModule from 'highcharts/modules/tilemap';
import addTreemapModule from 'highcharts/modules/treemap';
import addVariablePieModule from 'highcharts/modules/variable-pie';
import addVariwideModule from 'highcharts/modules/variwide';
import addVectorModule from 'highcharts/modules/vector';
import addVennModule from 'highcharts/modules/venn';
import addWindBarbModule from 'highcharts/modules/windbarb';
import addXRangeModule from 'highcharts/modules/xrange';

import { render } from '@testing-library/react';

import {
  HighchartsChart,
  Chart,
  YAxis,
  XAxis,
  HighchartsProvider
} from '../../../src';

import * as all from '../../../src';

addHighchartsMore(Highcharts);
//addHighcharts3DModule(Highcharts);
addBulletModule(Highcharts);
//addCylinderModule(Highcharts);
addFunnelModule(Highcharts);
addHeatmapModule(Highcharts);
//addHistogramBellCurveModule(Highcharts);
addNetworkGraphModule(Highcharts);
//addParetoModule(Highcharts);
addSankeyModule(Highcharts);
addSolidGaugeModule(Highcharts);
addStreamGraphModule(Highcharts);
addSunburstModule(Highcharts);
addTilemapModule(Highcharts);
addTreemapModule(Highcharts);
addVariablePieModule(Highcharts);
addVariwideModule(Highcharts);
addVectorModule(Highcharts);
addVennModule(Highcharts);
addWindBarbModule(Highcharts);
addXRangeModule(Highcharts);

const skippedSeries = ['BarSeries'];
const noAxisSeries = [
  'PieSeries',
  'VariablePieSeries',
  'PyramidSeries',
  'FunnelSeries',
  'VennSeries',
  'PackedBubbleSeries'
];
const needParentSeries = ['BellCurveSeries', 'HistogramSeries', 'ParetoSeries'];

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
        it('renders with real highcharts', done => {
          const afterAddSeries = event => {
            expect(event.target.series.length).toBe(1);
            const series = event.target.series[0];

            expect(series.type).toBe(seriesType);
            if (!noAxisSeries.includes(seriesName)) {
              expect(series.yAxis.userOptions.id).toBe('myYAxis');
            }
            done();
          };
          const Component = () => {
            return (
              <HighchartsProvider Highcharts={Highcharts}>
                <HighchartsChart>
                  <Chart zoomType="x" onAfterAddSeries={afterAddSeries} />
                  <XAxis></XAxis>
                  <YAxis id="myYAxis"></YAxis>
                  <SeriesComponent axisId="myYAxis" data={[1, 2, 3, 4]} />
                </HighchartsChart>
              </HighchartsProvider>
            );
          };
          render(<Component />);
        });
        it('binds hide event correctly', done => {
          const afterAddSeries = event => {
            const series = event.target.series[0];
            expect(series.visible).toBe(true);
            series.hide();
          };
          const onHide = event => {
            expect(event.target.visible).toBe(false);
            done();
          };
          const Component = () => {
            return (
              <HighchartsProvider Highcharts={Highcharts}>
                <HighchartsChart>
                  <Chart zoomType="x" onAfterAddSeries={afterAddSeries} />
                  <XAxis></XAxis>
                  <YAxis>
                    <SeriesComponent data={[1, 2, 3, 4]} onHide={onHide} />
                  </YAxis>
                </HighchartsChart>
              </HighchartsProvider>
            );
          };
          render(<Component />);
        });
      }
    });
  });
