import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import PlotLineLabel from '../../../src/components/PlotLine/PlotLineLabel';

describe('<PlotLine.Label />', function ()  {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    this.axisStubs = axisStubs;

    this.plotLine      = { id: 'myPlotLine', options: { label: { text: null } }, render: sinon.spy() };
    this.otherPlotLine = { id: 'myOtherPlotLine', options: { label: { text: 'Other' } }, render: sinon.spy() };

    this.getAxis = sinon.stub();
    this.axisStubs.object = {
      plotLinesAndBands: [
        this.plotLine,
        this.otherPlotLine
      ]
    }

    this.propsFromProviders = {
      getAxis
    };
  });

  afterEach(function () {
    clock.restore();
  });

  context('when mounted', function () {
    it('sets the correct plot line label', function () {
      mount(
        <PlotLineLabel id="myPlotLine" {...this.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      expect(this.plotLine.options.label).to.eql({
        text: 'My PlotLine Label'
      });
      expect(this.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotLine.render).to.have.been.called;
      expect(this.otherPlotLine.render).not.to.have.been.called;
    });

    it('should pass additional props too', function () {
      mount(
        <PlotLineLabel id="myPlotLine" align="left" color="red" {...this.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      expect(this.plotLine.options.label).to.eql({
        text: 'My PlotLine Label',
        align: 'left'
      });
      expect(this.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotLine.render).to.have.been.called;
      expect(this.otherPlotLine.render).not.to.have.been.called;
    });
  });

  context('update', function () {
    it('should update the correct plot line if the component props change', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...this.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      wrapper.setProps({ children: 'My New Label' });
      clock.tick(1);

      expect(this.plotLine.options.label).to.eql({
        text: 'My New Label'
      });
      expect(this.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotLine.render).to.have.been.called;
      expect(this.otherPlotLine.render).not.to.have.been.called;
    });
  });

  context('when unmounted', function () {
    it('removes the correct plot line label', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" {...this.propsFromProviders}>
          My PlotLine Label
        </PlotLineLabel>
      );
      clock.tick(1);
      wrapper.unmount();
      clock.tick(1);

      expect(this.plotLine.options.label).to.eql({
        text: null
      });
      expect(this.otherPlotLine.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotLine.render).to.have.been.called;
      expect(this.otherPlotLine.render).not.to.have.been.called;
    });
  });
});
