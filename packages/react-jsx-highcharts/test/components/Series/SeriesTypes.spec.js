import React from 'react';
import * as all from '../../../src';
import Series from '../../../src/components/Series';

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
  });
});
