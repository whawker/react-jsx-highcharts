import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Debug,
  HighchartsProvider,
  PlotBand,
  YAxis,
  useAxis
} from '../../../src';

describe('<PlotBandLineLabel /> integration', () => {
  const AxisSpy = ({ axisId, axisRef }) => {
    const axis = useAxis(axisId);
    axisRef.current = axis;
    return null;
  };

  describe('when parent axis is updated', () => {
    it('updates plotband style', () => {
      const axisRef = { current: null };
      const Component = ({ labelStyle, yaxisLabels }) => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <YAxis id="testyaxis" labels={yaxisLabels}>
                <AxisSpy axisRef={axisRef} />
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

      let yaxis = axisRef.current && axisRef.current.object;

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
