import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotLine from '../../../src/components/PlotBandLine/PlotLine';
import * as useAxis from '../../../src/components/UseAxis';

describe('<PlotLine />', () => {
  let testContext;
  let useAxisSpy;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;
    useAxisSpy = jest.spyOn(useAxis, 'default').mockImplementation(() => getAxis);

  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBandOrLine method', () => {
      mount(<PlotLine id="My PlotLine" value={2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My PlotLine', value: 2 }
      ), 'plotLines');
    });

    it('should pass additional props through to Axis addPlotBandOrLine method', () => {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" value={24.2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My Other PlotLine', borderColor: 'red', value: 24.2 }
      ), 'plotLines');
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotLine id="myPlotLineIdStr" value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotLineIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc'
      mount(
        <PlotLine id={idFunc} value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotLineIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotLine value={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot line by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotLine id="My PlotLine" value={2} />
      );
      testContext.axisStubs.removePlotBandOrLine.mockClear();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotBandOrLine).toHaveBeenCalledWith('My PlotLine');
    });
  });
});
