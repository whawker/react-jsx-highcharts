import React from 'react';
import { mount } from 'enzyme';
import PlotLine from '../../../src/components/PlotLine/PlotLine';

describe('<PlotLine />', function ()  {
  beforeEach(function () {
    this.addPlotLine = sinon.spy();
    this.removePlotLine = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a title using the Axis addPlotLine method', function () {
      mount(<PlotLine id="My PlotLine" from={1} to={2} addPlotLine={this.addPlotLine} />);
      expect(this.addPlotLine).to.have.been.calledWith(
        { id: 'My PlotLine', from: 1, to: 2, addPlotLine: this.addPlotLine }
      );
    });

    it('adds should pass additional props through to Axis addPlotLine method', function () {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" from={8.8} to={24.2} addPlotLine={this.addPlotLine} />);
      expect(this.addPlotLine).to.have.been.calledWith(
        { id: 'My Other PlotLine', borderColor: 'red', from: 8.8, to: 24.2, addPlotLine: this.addPlotLine }
      );
    });
  });

  describe('when unmounted', function () {
    it('removes the title by setting the title to text', function () {
      const wrapper = mount(
        <PlotLine id="My PlotLine" from={1} to={2} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine} />
      );
      wrapper.unmount();
      expect(this.removePlotLine).to.have.been.calledWith('My PlotLine');
    });
  });

  describe('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const child = mount(
        <PlotLine id="myId" from={10} to={20} addPlotLine={this.addPlotLine}>
          <ChildComponent />
        </PlotLine>
      ).children();
      expect(child.props()).to.eql(
        { id: 'myId', from: 10, to: 20, addPlotLine: this.addPlotLine }
      );
    });
  });
});
