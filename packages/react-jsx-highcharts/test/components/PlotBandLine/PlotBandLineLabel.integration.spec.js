import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Debug,
  HighchartsProvider,
  PlotBand,
  YAxis
} from '../../../src';

describe('<PlotBandLineLabel /> integration', () => {
  describe('when parent axis is updated', () => {
    it('updates plotband style', () => {
      const Component = ({ labelStyle, yaxisLabels }) => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <Debug />
              <YAxis id="testyaxis" labels={yaxisLabels}>
                <PlotBand from={1} to={2}>
                  <PlotBand.Label style={labelStyle} />
                </PlotBand>
              </YAxis>
            </HighchartsChart>
          </HighchartsProvider>
        );
      };

      const wrapper = mount(
        <Component labelStyle={{ color: '#aaa' }} yaxisLabels={{}} />
      );

      const chart = window.chart;
      const yaxis = chart.get('testyaxis');

      wrapper.setProps({
        labelStyle: { color: '#bbb' },
        yaxisLabels: {}
      });
      expect(yaxis.options.plotBands[0].label.style).toEqual({ color: '#bbb' });

      wrapper.setProps({
        labelStyle: { color: '#ccc' },
        yaxisLabels: {}
      });
      expect(yaxis.options.plotBands[0].label.style).toEqual({ color: '#ccc' });
    });
  });
});
