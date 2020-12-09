import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import * as all from '../../../src';
import Series from '../../../src/components/Series';

const skippedSeries = ['BarSeries'];
const noAxisSeries = [
  'FunnelSeries',
  'PackedBubbleSeries',
  'PieSeries',
  'PyramidSeries',
  'VariablePieSeries',
  'VennSeries'
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

    let props = {};
    if (needParentSeries.includes(seriesName)) {
      props.baseSeries = 'myBaseSeries';
    }

    describe(`<${seriesName} />`, () => {
      let renderer;
      beforeEach(() => {
        renderer = new ShallowRenderer();
      });

      it('renders a <Series />', () => {
        renderer.render(<SeriesComponent id="mySeries" {...props} />);
        const result = renderer.getRenderOutput();

        expect(result.type).toBe(Series);
      });

      it(`renders a <Series type="${seriesType}" />`, () => {
        renderer.render(<SeriesComponent id="mySeries" {...props} />);
        const result = renderer.getRenderOutput();

        expect(result.props).toHaveProperty('type', seriesType);
      });

      it('passes Data props through to <Series />', () => {
        renderer.render(
          <SeriesComponent id="myOtherSeries" data={[1, 2, 3, 4]} {...props} />
        );
        const result = renderer.getRenderOutput();

        expect(result.props).toHaveProperty('data', [1, 2, 3, 4]);
      });

      it('passes other props through to <Series />', () => {
        renderer.render(
          <SeriesComponent id="myThirdSeries" zIndex={-1} {...props} />
        );
        const result = renderer.getRenderOutput();

        expect(result.props).toHaveProperty('zIndex', -1);
      });

      if (noAxisSeries.includes(seriesName)) {
        it('does not require an axis', () => {
          renderer.render(<SeriesComponent id="myFourthSeries" {...props} />);
          const result = renderer.getRenderOutput();

          expect(result.props).toHaveProperty('requiresAxis', false);
        });
      }
    });
  });
