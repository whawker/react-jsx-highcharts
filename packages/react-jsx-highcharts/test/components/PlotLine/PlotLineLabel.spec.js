import React from 'react';
import { mount } from 'enzyme';
import PlotLineLabel from '../../../src/components/PlotLine/PlotLineLabel';

describe('<PlotLine.Label />', function ()  {
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers();
    this.plotLine      = { id: 'myPlotLine', options: { label: { text: null } }, render: sinon.spy() };
    this.otherPlotLine = { id: 'myOtherPlotLine', options: { label: { text: 'Other' } }, render: sinon.spy() };

    this.getAxis = sinon.stub();
    this.getAxis.returns({
      plotLinesAndBands: [
        this.plotLine,
        this.otherPlotLine
      ]
    })
  });

  afterEach(function () {
    clock.restore();
  });

  describe('when mounted', function () {
    it('sets the correct plot line label', function () {
      mount(
        <PlotLineLabel id="myPlotLine" getAxis={this.getAxis}>
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
        <PlotLineLabel id="myPlotLine" align="left" color="red" getAxis={this.getAxis}>
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

  describe('update', function () {
    it('should update the correct plot line if the component props change', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" getAxis={this.getAxis}>
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

  describe('when unmounted', function () {
    it('removes the correct plot line label', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" getAxis={this.getAxis}>
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
