import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import { createMockProvidedAxis, uuidRegex } from '../../test-utils';
import PlotLine from '../../../src/components/PlotBandLine/PlotLine';
import * as useAxis from '../../../src/components/UseAxis';

describe('<PlotLine />', () => {
  let testContext;
  let useAxisSpy;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, providedAxis } = createMockProvidedAxis({
      id: 'myAxis',
      type: 'yAxis'
    });
    testContext.axisStubs = axisStubs;
    useAxisSpy = vi
      .spyOn(useAxis, 'default')
      .mockImplementation(() => providedAxis);
  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBandOrLine method', () => {
      render(<PlotLine id="My PlotLine" value={2} />);
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledWith({
        id: 'My PlotLine',
        value: 2
      });
    });

    it('should pass additional props through to Axis addPlotBandOrLine method', () => {
      render(
        <PlotLine borderColor="red" id="My Other PlotLine" value={24.2} />
      );
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledWith({
        id: 'My Other PlotLine',
        borderColor: 'red',
        value: 24.2
      });
    });

    it('uses the provided ID if id prop is a string', () => {
      render(<PlotLine id="myPlotLineIdStr" value={2} />);
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toBe(
        'myPlotLineIdStr'
      );
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc';
      render(<PlotLine id={idFunc} value={2} />);
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toBe(
        'myPlotLineIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      render(<PlotLine value={2} />);
      expect(testContext.axisStubs.addPlotLine.mock.calls[0][0].id).toMatch(
        uuidRegex
      );
    });
  });

  describe('when updated', () => {
    it('removes and adds plotline when props change', () => {
      const wrapper = render(<PlotLine id="myplotline" value={3} width={10} />);
      testContext.axisStubs.addPlotLine.mockClear();
      wrapper.rerender(<PlotLine id="myplotline" value={4} width={10} />);

      expect(testContext.axisStubs.removePlotLine).toHaveBeenCalledWith(
        'myplotline'
      );
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledTimes(1);
      expect(testContext.axisStubs.addPlotLine).toHaveBeenCalledWith({
        id: 'myplotline',
        value: 4,
        width: 10
      });
    });
    it('does not remove plotline when only children change', () => {
      const wrapper = render(<PlotLine id="myplotline" value={3} width={10} />);
      testContext.axisStubs.addPlotLine.mockClear();
      testContext.axisStubs.removePlotLine.mockClear();
      wrapper.rerender(
        <PlotLine id="myplotline" value={3} width={10}>
          <div />
        </PlotLine>
      );

      expect(testContext.axisStubs.addPlotLine).not.toHaveBeenCalled();
      expect(testContext.axisStubs.removePlotLine).not.toHaveBeenCalled();
    });
  });

  describe('when unmounted', () => {
    it('removes the plot line by id (if the parent axis still exists)', () => {
      const wrapper = render(<PlotLine id="My PlotLine" value={2} />);
      testContext.axisStubs.removePlotLine.mockClear();
      wrapper.unmount();

      expect(testContext.axisStubs.removePlotLine).toHaveBeenCalledWith(
        'My PlotLine'
      );
    });
  });
});
