import React from 'react';
import PlotLine from '../../../src/components/PlotLine/PlotLine';
import { createMockAxis } from '../../test-utils';

describe('<PlotLine />', function ()  {
  beforeEach(function () {
    this.addPlotLine = sinon.spy();
    this.removePlotLine = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a title using the Axis addPlotLine method', function () {
      mount(<PlotLine id="My PlotLine" from={1} to={2} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine} />);
      expect(this.addPlotLine).to.have.been.calledWith(
        { id: 'My PlotLine', from: 1, to: 2, addPlotLine: this.addPlotLine, removePlotLine: this.removePlotLine }
      );
    });

    it('should pass additional props through to Axis addPlotLine method', function () {
      mount(<PlotLine borderColor="red" id="My Other PlotLine" from={8.8} to={24.2} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine} />);
      expect(this.addPlotLine).to.have.been.calledWith(
        { id: 'My Other PlotLine', borderColor: 'red', from: 8.8, to: 24.2, addPlotLine: this.addPlotLine, removePlotLine: this.removePlotLine }
      );
    });
  });

  describe('when unmounted', function () {
    it('removes the plot line by id (if the parent axis still exists)', function () {
      const wrapper = mount(
        <PlotLine id="My PlotLine" from={1} to={2} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine} getAxis={createMockAxis} />
      );
      this.removePlotLine.reset();
      wrapper.unmount();
      expect(this.removePlotLine).to.have.been.calledWith('My PlotLine');
    });

    it('does nothing if the axis has already been removed', function () {
      const wrapper = mount(
        <PlotLine id="My PlotLine" from={1} to={2} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine} getAxis={() => undefined} />
      );
      this.removePlotLine.reset();
      wrapper.unmount();
      expect(this.removePlotLine).not.to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotLine id="myId" from={10} to={20} addPlotLine={this.addPlotLine} removePlotLine={this.removePlotLine}>
          <ChildComponent />
        </PlotLine>
      ).children();
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { id: 'myId', from: 10, to: 20, addPlotLine: this.addPlotLine, removePlotLine: this.removePlotLine }
      );
    });
  });
});
