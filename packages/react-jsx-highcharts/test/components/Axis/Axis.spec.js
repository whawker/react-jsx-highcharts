import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highcharts';
import Axis from '../../../src/components/Axis/Axis';

describe('<Axis />', function ()  {
  let sandbox = null;

  beforeEach(function () {
    this.addAxis = sinon.spy();
    this.remove = sinon.spy();
    this.update = sinon.spy();
    this.getAxis = sinon.stub();
    this.getAxis.returns('mock-axis');

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'addEvent');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('adds an X axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" addAxis={this.addAxis} getAxis={this.getAxis} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', title: { text: null }, getAxis: this.getAxis }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="y" addAxis={this.addAxis} getAxis={this.getAxis} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', title: { text: null }, getAxis: this.getAxis }, false, true
      );
    });

    it('adds should pass additional props through to Highcharts addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" min={10} max={100} reversed addAxis={this.addAxis} getAxis={this.getAxis} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true, getAxis: this.getAxis }, true, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" dimension="x" onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          addAxis={this.addAxis}
          getAxis={this.getAxis} />
      );
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'setExtremes', handleSetExtremes);
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'afterSetExtremes', handleAfterSetExtremes);
    });
  });

  describe('update', function () {
    it('should update the axis if the component props change', function () {
      const wrapper = mount(
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} getAxis={this.getAxis} update={this.update} />
      );
      wrapper.setProps({ id: 'myAxis', dimension: 'x', newPropName: 'newPropValue' });
      expect(this.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the axis', function () {
      const wrapper = mount(
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} getAxis={this.getAxis} remove={this.remove} />
      );
      wrapper.unmount();
      expect(this.remove).to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the axis to the children', function () {
      const ChildComponent = props => (<div />);

      const child = mount(
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} getAxis={this.getAxis}>
          <ChildComponent />
        </Axis>
      ).children();
      expect(child.props()).to.eql(
        { dimension: 'x', axisId: 'myAxis' }
      );
    });
  });
});
