import React from 'react';
import { mount } from 'enzyme';
import PlotBandLabel from '../../../src/components/PlotBand/PlotBandLabel';

describe('<PlotBand.Label />', function ()  {
  beforeEach(function () {
    this.addPlotBand = sinon.spy();
    this.removePlotBand = sinon.spy();
  });

  describe('when mounted', function () {
    it('sets the correct plot band title', function () {
      mount(
        <PlotBandLabel id="myPlotBand" addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand}>
          My PlotBand Label
        </PlotBandLabel>
      );
      expect(this.removePlotBand).to.have.been.calledWith('myPlotBand');
      expect(this.addPlotBand).to.have.been.calledWith({
        id: 'myPlotBand',
        addPlotBand: this.addPlotBand,
        removePlotBand: this.removePlotBand,
        label: { text: 'My PlotBand Label' }
      });
    });

    it('adds should pass additional props too, to the label or band as appropriate', function () {
      mount(
        <PlotBandLabel id="myPlotBand" align="left" color="red" addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand}>
          My PlotBand Label
        </PlotBandLabel>
      );
      expect(this.removePlotBand).to.have.been.calledWith('myPlotBand');
      expect(this.addPlotBand).to.have.been.calledWith({
        id: 'myPlotBand',
        color: 'red',
        addPlotBand: this.addPlotBand,
        removePlotBand: this.removePlotBand,
        label: { text: 'My PlotBand Label', align: 'left' }
      });
    });
  });

  describe('update', function () {
    it('should update the correct plot band if the component props change', function () {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand}>
          My PlotBand Label
        </PlotBandLabel>
      );
      wrapper.setProps({ color: 'red' });
      expect(this.removePlotBand).to.have.been.calledWith('myPlotBand');
      expect(this.addPlotBand).to.have.been.calledWith({
        id: 'myPlotBand',
        addPlotBand: this.addPlotBand,
        removePlotBand: this.removePlotBand,
        label: { text: 'My PlotBand Label' }
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis title', function () {
      const wrapper = mount(
        <PlotBandLabel id="myPlotBand" addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand}>
          My PlotBand Label
        </PlotBandLabel>
      );
      wrapper.unmount();
      expect(this.removePlotBand).to.have.been.calledWith('myPlotBand');
      expect(this.addPlotBand).to.have.been.calledWith({
        id: 'myPlotBand',
        addPlotBand: this.addPlotBand,
        removePlotBand: this.removePlotBand,
        label: { text: null }
      });
    });
  });
});
