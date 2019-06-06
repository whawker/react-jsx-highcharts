import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import PlotLineLabel from '../../../src/components/PlotLine/PlotLineLabel';

describe('<PlotLine.Label />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.plotLine      = { id: 'myPlotLine', options: { label: { text: null } }, render: jest.fn() };
    testContext.otherPlotLine = { id: 'myOtherPlotLine', options: { label: { text: 'Other' } }, render: jest.fn() };

    testContext.getAxis = jest.fn();
    testContext.axisStubs.object = {
      plotLinesAndBands: [
        testContext.plotLine,
        testContext.otherPlotLine
      ]
    }

    testContext.propsFromProviders = {
      getAxis
    };

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe('when mounted', () => {
    it('sets the correct plot line label', () => {
      mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      expect(testContext.plotLine.options.label).toEqual({
        text: 'My PlotLine Label'
      });
      expect(testContext.otherPlotLine.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotLine.render).toHaveBeenCalled();
      expect(testContext.otherPlotLine.render).not.toHaveBeenCalled();
    });

    it('should pass additional props too', () => {
      mount(
        <PlotLineLabel id="myPlotLine" align="left" color="red" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      expect(testContext.plotLine.options.label).toEqual({
        text: 'My PlotLine Label',
        align: 'left'
      });
      expect(testContext.otherPlotLine.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotLine.render).toHaveBeenCalled();
      expect(testContext.otherPlotLine.render).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the correct plot line if the component props change', () => {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      wrapper.setProps({ children: 'My New Label' });

      expect(testContext.plotLine.options.label).toEqual({
        text: 'My New Label'
      });
      expect(testContext.otherPlotLine.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotLine.render).toHaveBeenCalled();
      expect(testContext.otherPlotLine.render).not.toHaveBeenCalled();
    });
  });

  describe('when unmounted', () => {
    it('removes the correct plot line label', () => {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      wrapper.unmount();

      expect(testContext.plotLine.options.label).toEqual({
        text: null
      });
      expect(testContext.otherPlotLine.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotLine.render).toHaveBeenCalled();
      expect(testContext.otherPlotLine.render).not.toHaveBeenCalled();
    });
  });
});
