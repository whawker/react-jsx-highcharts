import * as React from 'react';
import Highcharts from 'highcharts';
import { render } from '@testing-library/react';

import {
  HighchartsChart,
  HighchartsProvider,
  PlotBand,
  YAxis,
  XAxis,
  LineSeries
} from '../../../src';
import ContextSpy from '../../ContextSpy';

describe('<PlotBandLineLabel /> integration', () => {
  let axisRef;
  const DEFAULT_SERIES_DATA = [1, 2, 3, 4, 5];
  const Component = ({
    id,
    from,
    to,
    labelStyle,
    yaxisLabels,
    seriesData = DEFAULT_SERIES_DATA
  }) => {
    return (
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <YAxis></YAxis>
          <XAxis id="testyaxis" labels={yaxisLabels}>
            <ContextSpy axisRef={axisRef} />
            <LineSeries data={seriesData} />
            <PlotBand id={id} from={from} to={to}>
              <PlotBand.Label style={labelStyle} />
            </PlotBand>
          </XAxis>
        </HighchartsChart>
      </HighchartsProvider>
    );
  };

  beforeEach(() => {
    axisRef = { current: null };
  });

  describe('when parent axis is updated', () => {
    it('updates plotband style', () => {
      const wrapper = render(
        <Component
          labelStyle={{ color: '#aaa' }}
          yaxisLabels={{}}
          from={1}
          to={2}
        />
      );

      let axis = axisRef.current && axisRef.current.object;

      wrapper.rerender(
        <Component
          labelStyle={{ color: '#bbb' }}
          yaxisLabels={{}}
          from={1}
          to={2}
        />
      );

      expect(axis.plotLinesAndBands[0].options.label.style).toEqual({
        color: '#bbb'
      });

      wrapper.rerender(
        <Component
          labelStyle={{ color: '#ccc' }}
          yaxisLabels={{}}
          from={1}
          to={2}
        />
      );

      expect(axis.plotLinesAndBands[0].options.label.style).toEqual({
        color: '#ccc'
      });
    });
  });
});
