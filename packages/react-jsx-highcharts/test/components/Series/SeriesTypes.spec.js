import React from 'react';
import Highcharts from 'highcharts'

import addHighchartsMore from 'highcharts/highcharts-more';
//import addHighcharts3DModule from 'highcharts/highcharts-3d';
import addBulletModule from 'highcharts/modules/bullet';
import addFunnelModule from 'highcharts/modules/funnel';
//import addHistogramBellCurveModule from 'highcharts/modules/histogram-bellcurve';
//import addParetoModule from 'highcharts/modules/pareto';
import addSankeyModule from 'highcharts/modules/sankey';
import addSolidGaugeModule from 'highcharts/modules/solid-gauge';
import addStreamGraphModule from 'highcharts/modules/streamgraph';
//import addSunburstModule from 'highcharts/modules/sunburst';
//import addTilemapModule from 'highcharts/modules/tilemap';
//import addTreemapModule from 'highcharts/modules/treemap';
import addVariablePieModule from 'highcharts/modules/variable-pie';
import addVariwideModule from 'highcharts/modules/variwide';
import addVectorModule from 'highcharts/modules/vector';
import addWindBarbModule from 'highcharts/modules/windbarb';
import addXRangeModule from 'highcharts/modules/xrange';

import {
  HighchartsChart,
  Chart,
  YAxis,
  XAxis,
  Navigator,
  withHighcharts,
  Title
} from '../../../src';
import { renderIntoDocument } from 'react-dom/test-utils'

import * as all from '../../../src';
import Series from '../../../src/components/Series';

addHighchartsMore(Highcharts)
//addHighcharts3DModule(Highcharts);
addBulletModule(Highcharts);
addFunnelModule(Highcharts);
//addHistogramBellCurveModule(Highcharts);
//addParetoModule(Highcharts);
addSankeyModule(Highcharts);
addSolidGaugeModule(Highcharts);
addStreamGraphModule(Highcharts);
//addSunburstModule(Highcharts);
//addTilemapModule(Highcharts);
//addTreemapModule(Highcharts);
addVariablePieModule(Highcharts);
addVariwideModule(Highcharts);
addVectorModule(Highcharts);
addWindBarbModule(Highcharts);
addXRangeModule(Highcharts);

const skippedSeries = ['BarSeries'];
const noAxisSeries = ['PieSeries', 'VariablePieSeries','PyramidSeries', 'FunnelSeries'];
const needParentSeries = ['BellCurveSeries','HistogramSeries', 'ParetoSeries'];

Object.keys(all).filter(name => /^[A-Z].*Series$/.test(name)).forEach((seriesName) => {
  if (skippedSeries.includes(seriesName)) return;

  const seriesType = seriesName.substring(0, seriesName.indexOf('Series')).toLowerCase();
  const SeriesComponent = all[seriesName]; // eslint-disable-line import/namespace

  let props = {};
  if(needParentSeries.includes(seriesName)) {
    props.baseSeries="myBaseSeries";
  }

  describe(`<${seriesName} />`, () => {

    it('renders a <Series />', () => {
      const wrapper = shallow(<SeriesComponent id="mySeries" {...props} />);
      expect(wrapper.type()).toBe(Series);
    });
    it(`renders a <Series type="${seriesType}" />`, () => {
      const wrapper = shallow(<SeriesComponent id="mySeries" {...props} />);
      expect(wrapper).toHaveProp('type',seriesType);
    });
    it('passes Data props through to <Series />', () => {
      const wrapper = shallow(<SeriesComponent id="myOtherSeries" data={[1, 2, 3, 4]} {...props}/>);
      expect(wrapper).toHaveProp('data',[1, 2, 3, 4]);
    });
    it('passes other props through to <Series />', () => {
      const wrapper = shallow(<SeriesComponent id="myThirdSeries" zIndex={-1} {...props} />);
      expect(wrapper).toHaveProp('zIndex', -1);
    });

    if(noAxisSeries.includes(seriesName)) {
      it('does not require an axis', () => {
        const wrapper = shallow(<SeriesComponent id="myFourthSeries" {...props}/>);
        expect(wrapper).toHaveProp('requiresAxis', false);
      });
    }

    if(seriesType in Highcharts.seriesTypes) {
      it('renders with real highcharts', (done) => {
        const afterAddSeries = (event) => {
          expect(event.target.series.length).toBe(1);
          expect(event.target.series[0].type).toBe(seriesType);
          done();
        }
        const Component = (props) => {
          return (
            <HighchartsChart>
              <Chart zoomType="x" onAfterAddSeries={afterAddSeries}/>
              <XAxis>
              </XAxis>
              <YAxis>
                <SeriesComponent data={[1,2,3,4]}/>
              </YAxis>
            </HighchartsChart>
          )
        };
        const WithComponent = withHighcharts(Component, Highcharts);
        const renderedChart = renderIntoDocument(<WithComponent />);
      });
      it('binds hide event correctly', (done) => {
        const afterAddSeries = (event) => {
          expect(event.target.series[0].visible).toBe(true);
          event.target.series[0].hide();
        }
        const onHide = (event) => {
          expect(event.target.visible).toBe(false);
          done();
        }
        const Component = (props) => {
          return (
            <HighchartsChart>
              <Chart zoomType="x" onAfterAddSeries={afterAddSeries}/>
              <XAxis>
              </XAxis>
              <YAxis>
                <SeriesComponent data={[1,2,3,4]} onHide={ onHide }/>
              </YAxis>
            </HighchartsChart>
          )
        };
        const WithComponent = withHighcharts(Component, Highcharts);
        const renderedChart = renderIntoDocument(<WithComponent />);

      });
    }
  });
});
