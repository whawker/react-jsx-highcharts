import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  HighchartsProvider,
  PlotBand,
  YAxis,
  useAxis
} from '../../../src';
import { uuidRegex } from '../../test-utils';

describe('<PlotBandLineLabel /> integration', () => {
  const AxisSpy = ({ axisId, axisRef }) => {
    const axis = useAxis(axisId);
    const addPlotBandOrLineSpy = jest.spyOn(axis, 'addPlotBandOrLine');
    const removePlotBandOrLineSpy = jest.spyOn(axis, 'removePlotBandOrLine');

    axisRef.current = axis;
    axisRef.addPlotBandOrLineSpy = addPlotBandOrLineSpy;
    axisRef.removePlotBandOrLineSpy = removePlotBandOrLineSpy;
    return null;
  };

  let axisRef;

  const Component = ({ id, from, to, borderColor, mountPlotBand = true }) => {
    return (
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <YAxis id="testyaxis">
            <AxisSpy axisRef={axisRef} />
            {mountPlotBand ? (
              <PlotBand borderColor={borderColor} id={id} from={from} to={to} />
            ) : null}
          </YAxis>
        </HighchartsChart>
      </HighchartsProvider>
    );
  };

  beforeEach(() => {
    axisRef = { current: null };
  });

  describe('when mounted', () => {
    it('adds a plotband to the Axis', () => {
      mount(<Component id="My PlotBand" from={1} to={2} />);
      let yaxis = axisRef.current && axisRef.current.object;
      expect(yaxis.plotLinesAndBands[0].options).toEqual({
        id: 'My PlotBand',
        from: 1,
        to: 2
      });
    });

    it('should pass additional props through', () => {
      mount(
        <Component
          borderColor="red"
          id="My Other PlotBand"
          from={8.8}
          to={24.2}
        />
      );
      let axis = axisRef.current && axisRef.current.object;
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy).toHaveBeenCalledWith(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2 },
        'plotBands'
      );
      expect(axis.plotLinesAndBands[0].options).toEqual({
        id: 'My Other PlotBand',
        borderColor: 'red',
        from: 8.8,
        to: 24.2
      });
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(<Component id="myPlotBandIdStr" from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toBe('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotBandIdFromFunc';
      mount(<Component id={idFunc} from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toBe(
        'myPlotBandIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(<Component from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;

      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot band by id (if the parent axis still exists)', () => {
      const wrapper = mount(<Component id="My PlotBand" from={1} to={2} />);
      let axis = axisRef.current && axisRef.current.object;
      const removePlotBandOrLineSpy = axisRef.removePlotBandOrLineSpy;
      removePlotBandOrLineSpy.mockClear();
      wrapper.setProps({ mountPlotBand: false });
      expect(removePlotBandOrLineSpy).toHaveBeenCalledWith('My PlotBand');
      expect(removePlotBandOrLineSpy).toHaveBeenCalledTimes(1);
      expect(axis.plotLinesAndBands.length).toEqual(0);
    });
  });
});
