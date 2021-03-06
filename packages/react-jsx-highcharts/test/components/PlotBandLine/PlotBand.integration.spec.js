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
import { uuidRegex } from '../../test-utils';
import ContextSpy from '../../ContextSpy';

describe('<PlotBand /> integration', () => {
  let axisRef;
  const DEFAULT_AXIS_LABELS = {};
  const DEFAULT_SERIES_DATA = [1, 2, 3, 4, 5];
  const Component = ({
    id,
    from,
    to,
    borderColor,
    mountPlotBand = true,
    axisLabels = DEFAULT_AXIS_LABELS,
    seriesData = DEFAULT_SERIES_DATA
  }) => {
    return (
      <HighchartsProvider Highcharts={Highcharts}>
        <HighchartsChart>
          <YAxis></YAxis>
          <XAxis labels={axisLabels}>
            <ContextSpy axisRef={axisRef} />
            <LineSeries data={seriesData} />

            {mountPlotBand ? (
              <PlotBand borderColor={borderColor} id={id} from={from} to={to} />
            ) : null}
          </XAxis>
        </HighchartsChart>
      </HighchartsProvider>
    );
  };

  beforeEach(() => {
    axisRef = { current: null };
  });

  describe('when mounted', () => {
    it('adds a plotband to the Axis', () => {
      render(<Component id="My PlotBand" from={1} to={2} />);
      let axis = axisRef.current && axisRef.current.object;
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      const removePlotBandOrLineSpy = axisRef.removePlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy).toHaveBeenCalledTimes(1);
      expect(removePlotBandOrLineSpy).toHaveBeenCalledTimes(0);
      expect(axis.plotLinesAndBands[0].options).toEqual({
        id: 'My PlotBand',
        from: 1,
        to: 2
      });
    });

    it('should pass additional props through', () => {
      render(
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
      render(<Component id="myPlotBandIdStr" from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toBe('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotBandIdFromFunc';
      render(<Component id={idFunc} from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toBe(
        'myPlotBandIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      render(<Component from={1} to={2} />);
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      expect(addPlotBandOrLineSpy.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when updated', () => {
    it('removes and adds plotband to axis', () => {
      const wrapper = render(<Component id="My PlotBand" from={1} to={2} />);
      let axis = axisRef.current && axisRef.current.object;
      const addPlotBandOrLineSpy = axisRef.addPlotBandOrLineSpy;
      const removePlotBandOrLineSpy = axisRef.removePlotBandOrLineSpy;
      addPlotBandOrLineSpy.mockClear();

      wrapper.rerender(<Component id="My PlotBand" from={1} to={5} />);

      expect(removePlotBandOrLineSpy).toHaveBeenCalledWith('My PlotBand');
      expect(removePlotBandOrLineSpy).toHaveBeenCalledTimes(1);
      expect(addPlotBandOrLineSpy).toHaveBeenCalledTimes(1);
      expect(addPlotBandOrLineSpy).toHaveBeenCalledWith(
        { id: 'My PlotBand', from: 1, to: 5 },
        'plotBands'
      );
      expect(axis.plotLinesAndBands[0].options).toEqual({
        id: 'My PlotBand',
        from: 1,
        to: 5
      });
    });
  });

  describe('when parent axis updated', () => {
    it('keeps the plotband on axis', () => {
      const wrapper = render(<Component id="My PlotBand" from={1} to={2} />);
      let axis = axisRef.current && axisRef.current.object;
      const removePlotBandOrLineSpy = axisRef.removePlotBandOrLineSpy;
      expect(axis.plotLinesAndBands[0].options).toEqual({
        id: 'My PlotBand',
        from: 1,
        to: 2
      });

      wrapper.rerender(
        <Component id="My PlotBand" from={1} to={2} axisLabels={{}} />
      );

      expect(removePlotBandOrLineSpy).not.toHaveBeenCalled();
      expect(axis.plotLinesAndBands[0].options).toEqual({
        id: 'My PlotBand',
        from: 1,
        to: 2
      });
    });
  });

  describe('when unmounted', () => {
    it('removes the plot band by id (if the parent axis still exists)', () => {
      const wrapper = render(<Component id="My PlotBand" from={1} to={2} />);
      let axis = axisRef.current && axisRef.current.object;
      const removePlotBandOrLineSpy = axisRef.removePlotBandOrLineSpy;
      removePlotBandOrLineSpy.mockClear();

      wrapper.rerender(
        <Component id="My PlotBand" from={1} to={2} mountPlotBand={false} />
      );

      expect(removePlotBandOrLineSpy).toHaveBeenCalledWith('My PlotBand');
      expect(removePlotBandOrLineSpy).toHaveBeenCalledTimes(1);
      expect(axis.plotLinesAndBands.length).toEqual(0);
    });
  });
});
