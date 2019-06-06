import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import PlotBandLabel from '../../../src/components/PlotBand/PlotBandLabel';

describe('<PlotBand.Label />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.plotBand      = { id: 'myPlotBand', options: { label: { text: null } }, render: jest.fn() };
    testContext.otherPlotBand = { id: 'myOtherPlotBand', options: { label: { text: 'Other' } }, render: jest.fn() };

    testContext.getAxis = jest.fn();
    testContext.axisStubs.object = {
      plotLinesAndBands: [
        testContext.plotBand,
        testContext.otherPlotBand
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
    it('sets the correct plot band label', () => {
      mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      expect(testContext.plotBand.options.label).toEqual({
        text: 'My PlotBand Label'
      });
      expect(testContext.otherPlotBand.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotBand.render).toHaveBeenCalled();
      expect(testContext.otherPlotBand.render).not.toHaveBeenCalled();
    });

    it('should pass additional props too', () => {
      mount(
        <PlotBandLabel id="myPlotBand" align="left" color="red" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      expect(testContext.plotBand.options.label).toEqual({
        text: 'My PlotBand Label',
        align: 'left'
      });
      expect(testContext.otherPlotBand.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotBand.render).toHaveBeenCalled();
      expect(testContext.otherPlotBand.render).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the correct plot band if the component props change', () => {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      wrapper.setProps({ children: 'My New Label' });

      expect(testContext.plotBand.options.label).toEqual({
        text: 'My New Label'
      });
      expect(testContext.otherPlotBand.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotBand.render).toHaveBeenCalled();
      expect(testContext.otherPlotBand.render).not.toHaveBeenCalled();
    });
  });

  describe('when unmounted', () => {
    it('removes the correct plot band label', () => {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      wrapper.unmount();

      expect(testContext.plotBand.options.label).toEqual({
        text: null
      });
      expect(testContext.otherPlotBand.options.label).toEqual({
        text: 'Other'
      });
      expect(testContext.plotBand.render).toHaveBeenCalled();
      expect(testContext.otherPlotBand.render).not.toHaveBeenCalled();
    });
  });
});
