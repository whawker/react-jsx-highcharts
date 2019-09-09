import React from 'react';
import PlotBandLineLabel from '../../../src/components/PlotBandLine/PlotBandLineLabel';
import PlotLineContext from '../../../src/components/PlotBandLine/PlotBandLineContext';

describe('<PlotBandLineLabel.Label />', () => {
  let testContext;
  let ProvidedPlotBandLineLabel;
  beforeEach(() => {
    testContext = {};

    testContext.plotLine      = { id: 'myPlotLine', options: { label: { text: null } }, render: jest.fn() };

    testContext.getAxis = jest.fn();

    ProvidedPlotBandLineLabel = (props) => (
      <PlotLineContext.Provider value={testContext.plotLine}>
        <PlotBandLineLabel {...props} />
      </PlotLineContext.Provider>
    )


    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe('when mounted', () => {
    it('sets the correct plot line label', () => {
      mount(
        <ProvidedPlotBandLineLabel>
          My PlotLine Label
        </ProvidedPlotBandLineLabel>
      );
      expect(testContext.plotLine.options.label).toEqual({
        text: 'My PlotLine Label'
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });

    it('should pass additional props too', () => {
      mount(
        <ProvidedPlotBandLineLabel align="left" color="red">
          My PlotLine Label
        </ProvidedPlotBandLineLabel>
      );
      expect(testContext.plotLine.options.label).toEqual({
        text: 'My PlotLine Label',
        align: 'left'
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update the correct plot line if the component props change', () => {
      const wrapper = mount(
        <ProvidedPlotBandLineLabel id="myPlotLine">
          My PlotLine Label
        </ProvidedPlotBandLineLabel>
      );
      testContext.plotLine.render.mockClear();
      wrapper.setProps({ children: 'My New Label' });

      expect(testContext.plotLine.options.label).toEqual({
        text: 'My New Label'
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('when unmounted', () => {
    it('removes the correct plot line label', () => {
      const wrapper = mount(
        <ProvidedPlotBandLineLabel id="myPlotLine">
          My PlotLine Label
        </ProvidedPlotBandLineLabel>
      );
      testContext.plotLine.render.mockClear();
      wrapper.unmount();

      expect(testContext.plotLine.options.label).toEqual({
        text: null
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });
  });
});
