import React from 'react';
import { mount } from 'enzyme';
import PlotLineLabel from '../../../src/components/PlotLine/PlotLineLabel';

describe('<PlotLine.Label />', function ()  {
  beforeEach(function () {
    this.addPlotLine = sinon.spy();
    this.removePlotLine = sinon.spy();
  });

  describe('when mounted', function () {
    it('sets the correct plot band title', function () {
      mount(
        <PlotLineLabel id="myPlotLine" addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine}>
          My PlotLine Label
        </PlotLineLabel>
      );
      expect(this.removePlotLine).to.have.been.calledWith('myPlotLine');
      expect(this.addPlotLine).to.have.been.calledWith({
        id: 'myPlotLine',
        addPlotLine: this.addPlotLine,
        removePlotLine: this.removePlotLine,
        label: { text: 'My PlotLine Label' }
      });
    });

    it('adds should pass additional props too, to the label or band as appropriate', function () {
      mount(
        <PlotLineLabel id="myPlotLine" align="left" color="red" addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine}>
          My PlotLine Label
        </PlotLineLabel>
      );
      expect(this.removePlotLine).to.have.been.calledWith('myPlotLine');
      expect(this.addPlotLine).to.have.been.calledWith({
        id: 'myPlotLine',
        color: 'red',
        addPlotLine: this.addPlotLine,
        removePlotLine: this.removePlotLine,
        label: { text: 'My PlotLine Label', align: 'left' }
      });
    });
  });

  describe('update', function () {
    it('should update the correct plot band if the component props change', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine}>
          My PlotLine Label
        </PlotLineLabel>
      );
      wrapper.setProps({ color: 'red' });
      expect(this.removePlotLine).to.have.been.calledWith('myPlotLine');
      expect(this.addPlotLine).to.have.been.calledWith({
        id: 'myPlotLine',
        addPlotLine: this.addPlotLine,
        removePlotLine: this.removePlotLine,
        label: { text: 'My PlotLine Label' }
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis title', function () {
      const wrapper = mount(
        <PlotLineLabel id="myPlotLine" addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine}>
          My PlotLine Label
        </PlotLineLabel>
      );
      wrapper.unmount();
      expect(this.removePlotLine).to.have.been.calledWith('myPlotLine');
      expect(this.addPlotLine).to.have.been.calledWith({
        id: 'myPlotLine',
        addPlotLine: this.addPlotLine,
        removePlotLine: this.removePlotLine,
        label: { text: null }
      });
    });
  });
});
