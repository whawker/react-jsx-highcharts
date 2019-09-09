import React from 'react';
import { createMockProvidedAxis, uuidRegex } from '../../test-utils'
import PlotBand from '../../../src/components/PlotBandLine/PlotBand';

describe('<PlotBand />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.propsFromProviders = {
      getAxis
    };
  });

  describe('when mounted', () => {
    it('adds a title using the Axis addPlotBand method', () => {
      mount(<PlotBand id="My PlotBand" from={1} to={2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotBand).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My PlotBand', from: 1, to: 2 }
      ));
    });

    it('should pass additional props through to Axis addPlotBand method', () => {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.addPlotBand).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2 }
      ));
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <PlotBand id="myPlotBandIdStr" from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.mock.calls[0][0].id).toBe('myPlotBandIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotBandIdFromFunc'
      mount(
        <PlotBand id={idFunc} from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.mock.calls[0][0].id).toBe('myPlotBandIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <PlotBand from={1} to={2} {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.addPlotBand.mock.calls[0][0].id).toMatch(uuidRegex);
    });
  });

  describe('when unmounted', () => {
    it('removes the plot band by id (if the parent axis still exists)', () => {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} {...testContext.propsFromProviders} />
      );
      testContext.axisStubs.removePlotBand.mockReset();
      wrapper.unmount();
      expect(testContext.axisStubs.removePlotBand).toHaveBeenCalledWith('My PlotBand');
    });
  });
});
