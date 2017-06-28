import React from 'react';
import { mount } from 'enzyme';
import PlotBand from '../../../src/components/PlotBand/PlotBand';

describe('<PlotBand />', function ()  {
  beforeEach(function () {
    this.addPlotBand = sinon.spy();
    this.removePlotBand = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a title using the Axis addPlotBand method', function () {
      mount(<PlotBand id="My PlotBand" from={1} to={2} addPlotBand={this.addPlotBand} />);
      expect(this.addPlotBand).to.have.been.calledWith(
        { id: 'My PlotBand', from: 1, to: 2, addPlotBand: this.addPlotBand }
      );
    });

    it('adds should pass additional props through to Axis addPlotBand method', function () {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} addPlotBand={this.addPlotBand} />);
      expect(this.addPlotBand).to.have.been.calledWith(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2, addPlotBand: this.addPlotBand }
      );
    });
  });

  describe('when unmounted', function () {
    it('removes the title by setting the title to text', function () {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand} />
      );
      wrapper.unmount();
      expect(this.removePlotBand).to.have.been.calledWith('My PlotBand');
    });
  });

  describe('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const child = mount(
        <PlotBand id="myId" from={10} to={20} addPlotBand={this.addPlotBand}>
          <ChildComponent />
        </PlotBand>
      ).children();
      expect(child.props()).to.eql(
        { id: 'myId', from: 10, to: 20, addPlotBand: this.addPlotBand }
      );
    });
  });
});
