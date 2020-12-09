import * as React from 'react';
import { render } from '@testing-library/react';

import PlotBandLineLabel from '../../../src/components/PlotBandLine/PlotBandLineLabel';
import PlotLineContext from '../../../src/components/PlotBandLineContext';

describe('<PlotBandLineLabel.Label />', () => {
  let testContext;
  let ProvidedPlotBandLineLabel;
  beforeEach(() => {
    testContext = {};

    testContext.plotLine = {
      id: 'myPlotLine',
      options: { label: { text: null } },
      render: jest.fn()
    };
    testContext.providedPlotline = {
      get object() {
        return testContext.plotLine;
      }
    };
    ProvidedPlotBandLineLabel = props => (
      <PlotLineContext.Provider value={testContext.providedPlotline}>
        <PlotBandLineLabel {...props} />
      </PlotLineContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('sets the correct plot line label', () => {
      render(
        <ProvidedPlotBandLineLabel>My PlotLine Label</ProvidedPlotBandLineLabel>
      );

      expect(testContext.plotLine.options.label).toEqual({
        text: 'My PlotLine Label'
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });

    it('should pass additional props too', () => {
      render(
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

    it('should pass formatter prop', () => {
      const formatter = () => 'My PlotLine Label';
      render(<ProvidedPlotBandLineLabel formatter={formatter} />);

      expect(testContext.plotLine.options.label).toEqual({
        formatter
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update the correct plot line if the component props change', () => {
      const wrapper = render(
        <ProvidedPlotBandLineLabel id="myPlotLine">
          My PlotLine Label
        </ProvidedPlotBandLineLabel>
      );
      testContext.plotLine.render.mockClear();
      wrapper.rerender(
        <ProvidedPlotBandLineLabel id="myPlotLine">
          My New Label
        </ProvidedPlotBandLineLabel>
      );

      expect(testContext.plotLine.options.label).toEqual({
        text: 'My New Label'
      });
      expect(testContext.plotLine.render).toHaveBeenCalledTimes(1);
    });
  });

  describe('when unmounted', () => {
    it('sets the correct plot line label text to null', () => {
      const wrapper = render(
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
