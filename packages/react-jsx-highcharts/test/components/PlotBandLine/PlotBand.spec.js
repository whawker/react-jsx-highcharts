import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotBand from '../../../src/components/PlotBandLine/PlotBand';
import * as useAxis from '../../../src/components/UseAxis';

describe('<PlotBand />', () => {
  let testContext;
  let useAxisSpy;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, providedAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;
    useAxisSpy = jest.spyOn(useAxis, 'default').mockImplementation(() => providedAxis);

  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBandOrLine method', () => {
      mount(<PlotBand id="My PlotBand" from={1} to={2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(
        { id: 'My PlotBand', from: 1, to: 2 }
      , 'plotBands');
    });

    it('should pass additional props through to Axis addPlotBandOrLine method', () => {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} />);
      expect(testContext.axisStubs.addPlotBandOrLine).toHaveBeenCalledWith(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2 }
      , 'plotBands');
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotBand id="myPlotBandIdStr" from={1} to={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotBandIdFromFunc'
      mount(
        <PlotBand id={idFunc} from={1} to={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toBe('myPlotBandIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotBand from={1} to={2} />
      );
      expect(testContext.axisStubs.addPlotBandOrLine.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot band by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} />
      );
      testContext.axisStubs.removePlotBandOrLine.mockClear();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotBandOrLine).toHaveBeenCalledWith('My PlotBand');
    });
  });
});
