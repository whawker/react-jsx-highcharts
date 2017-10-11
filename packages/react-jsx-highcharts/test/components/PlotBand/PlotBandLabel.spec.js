import React from 'react';
import PlotBandLabel from '../../../src/components/PlotBand/PlotBandLabel';

describe('<PlotBand.Label />', function ()  {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    this.plotBand      = { id: 'myPlotBand', options: { label: { text: null } }, render: sinon.spy() };
    this.otherPlotBand = { id: 'myOtherPlotBand', options: { label: { text: 'Other' } }, render: sinon.spy() };

    this.getAxis = sinon.stub();
    this.getAxis.returns({
      plotLinesAndBands: [
        this.plotBand,
        this.otherPlotBand
      ]
    })
  });

  afterEach(function () {
    clock.restore();
  });

  describe('when mounted', function () {
    it('sets the correct plot band label', function () {
      mount(
        <PlotBandLabel id="myPlotBand" getAxis={this.getAxis}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      expect(this.plotBand.options.label).to.eql({
        text: 'My PlotBand Label'
      });
      expect(this.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotBand.render).to.have.been.called;
      expect(this.otherPlotBand.render).not.to.have.been.called;
    });

    it('should pass additional props too', function () {
      mount(
        <PlotBandLabel id="myPlotBand" align="left" color="red" getAxis={this.getAxis}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      expect(this.plotBand.options.label).to.eql({
        text: 'My PlotBand Label',
        align: 'left'
      });
      expect(this.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotBand.render).to.have.been.called;
      expect(this.otherPlotBand.render).not.to.have.been.called;
    });
  });

  describe('update', function () {
    it('should update the correct plot band if the component props change', function () {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" getAxis={this.getAxis}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      wrapper.setProps({ children: 'My New Label' });
      clock.tick(1);

      expect(this.plotBand.options.label).to.eql({
        text: 'My New Label'
      });
      expect(this.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotBand.render).to.have.been.called;
      expect(this.otherPlotBand.render).not.to.have.been.called;
    });
  });

  describe('when unmounted', function () {
    it('removes the correct plot band label', function () {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" getAxis={this.getAxis}>
          My PlotBand Label
        </PlotBandLabel>
      );
      clock.tick(1);
      wrapper.unmount();
      clock.tick(1);

      expect(this.plotBand.options.label).to.eql({
        text: null
      });
      expect(this.otherPlotBand.options.label).to.eql({
        text: 'Other'
      });
      expect(this.plotBand.render).to.have.been.called;
      expect(this.otherPlotBand.render).not.to.have.been.called;
    });
  });
});
