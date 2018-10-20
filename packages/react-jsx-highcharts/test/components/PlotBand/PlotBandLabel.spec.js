import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import PlotBandLabel from '../../../src/components/PlotBand/PlotBandLabel';

describe('<PlotBand.Label />', () => {
  let testContext;

  let clock;

  beforeEach(() => {
    testContext = {};
    clock = sinon.useFakeTimers();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.plotBand      = { id: 'myPlotBand', options: { label: { text: null } }, render: sinon.spy() };
    testContext.otherPlotBand = { id: 'myOtherPlotBand', options: { label: { text: 'Other' } }, render: sinon.spy() };

    testContext.getAxis = sinon.stub();
    testContext.axisStubs.object = {
      plotLinesAndBands: [
        testContext.plotBand,
        testContext.otherPlotBand
      ]
    }

    testContext.propsFromProviders = {
      getAxis
    };
  });

  afterEach(() => {
    clock.restore();
  });

  describe('when mounted', () => {
    it('sets the correct plot band label', () => {
      mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      expect(testContext.plotBand.options.label).to.eql({
        text: 'My PlotBand Label'
      });
      expect(testContext.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotBand.render).to.have.been.called;
      expect(testContext.otherPlotBand.render).not.to.have.been.called;
    });

    it('should pass additional props too', () => {
      mount(
        <PlotBandLabel id="myPlotBand" align="left" color="red" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      expect(testContext.plotBand.options.label).to.eql({
        text: 'My PlotBand Label',
        align: 'left'
      });
      expect(testContext.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotBand.render).to.have.been.called;
      expect(testContext.otherPlotBand.render).not.to.have.been.called;
    });
  });

  describe('update', () => {
    it('should update the correct plot band if the component props change', () => {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      wrapper.setProps({ children: 'My New Label' });
      clock.tick(1);

      expect(testContext.plotBand.options.label).to.eql({
        text: 'My New Label'
      });
      expect(testContext.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotBand.render).to.have.been.called;
      expect(testContext.otherPlotBand.render).not.to.have.been.called;
    });
  });

  describe('when unmounted', () => {
    it('removes the correct plot band label', () => {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" {...testContext.propsFromProviders}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      wrapper.unmount();
      clock.tick(1);

      expect(testContext.plotBand.options.label).to.eql({
        text: null
      });
      expect(testContext.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotBand.render).to.have.been.called;
      expect(testContext.otherPlotBand.render).not.to.have.been.called;
    });
  });
});
