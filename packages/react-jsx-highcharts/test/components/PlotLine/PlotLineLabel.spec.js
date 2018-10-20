import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import PlotLineLabel from '../../../src/components/PlotLine/PlotLineLabel';

describe('<PlotLine.Label />', () => {
  let testContext;

  let clock;

  beforeEach(() => {
    testContext = {};
    clock = sinon.useFakeTimers();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.plotLine      = { id: 'myPlotLine', options: { label: { text: null } }, render: sinon.spy() };
    testContext.otherPlotLine = { id: 'myOtherPlotLine', options: { label: { text: 'Other' } }, render: sinon.spy() };

    testContext.getAxis = sinon.stub();
    testContext.axisStubs.object = {
      plotLinesAndBands: [
        testContext.plotLine,
        testContext.otherPlotLine
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
    it('sets the correct plot line label', () => {
      mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      expect(testContext.plotLine.options.label).to.eql({
        text: 'My PlotLine Label'
      });
      expect(testContext.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotLine.render).to.have.been.called;
      expect(testContext.otherPlotLine.render).not.to.have.been.called;
    });

    it('should pass additional props too', () => {
      mount(
        <PlotLineLabel id="myPlotLine" align="left" color="red" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      expect(testContext.plotLine.options.label).to.eql({
        text: 'My PlotLine Label',
        align: 'left'
      });
      expect(testContext.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotLine.render).to.have.been.called;
      expect(testContext.otherPlotLine.render).not.to.have.been.called;
    });
  });

  describe('update', () => {
    it('should update the correct plot line if the component props change', () => {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      wrapper.setProps({ children: 'My New Label' });
      clock.tick(1);

      expect(testContext.plotLine.options.label).to.eql({
        text: 'My New Label'
      });
      expect(testContext.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotLine.render).to.have.been.called;
      expect(testContext.otherPlotLine.render).not.to.have.been.called;
    });
  });

  describe('when unmounted', () => {
    it('removes the correct plot line label', () => {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...testContext.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      wrapper.unmount();
      clock.tick(1);

      expect(testContext.plotLine.options.label).to.eql({
        text: null
      });
      expect(testContext.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(testContext.plotLine.render).to.have.been.called;
      expect(testContext.otherPlotLine.render).not.to.have.been.called;
    });
  });
});
