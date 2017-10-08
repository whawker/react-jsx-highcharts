import React from 'react';
import { Highcharts } from '../../test-utils';
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

    this.propsFromProviders = {
      addAxis: this.addAxis,
      remove: this.remove,
      update: this.update,
      getAxis: this.getAxis,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted (dynamic)', function () {
    it('adds an X axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" {...this.propsFromProviders} />);
      expect(this.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="y" {...this.propsFromProviders} />);
      expect(this.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, false, true
      );
    });

    it('should pass additional props through to Highcharts addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" min={10} max={100} reversed {...this.propsFromProviders} />);
      expect(this.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" dimension="x" onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...this.propsFromProviders} />
      );
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'setExtremes', handleSetExtremes);
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'afterSetExtremes', handleAfterSetExtremes);
    });
  });

  describe('when mounted (NOT dynamic)', function () {
    it('updates a non dynamic axis using the update method', function () {
      mount(<Axis id="myAxis" dimension="z" dynamicAxis={false} {...this.propsFromProviders} />);
      expect(this.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true
      );
    });

    it('should pass additional props through to Highcharts update method', function () {
      mount(<Axis id="myAxis" dimension="z" dynamicAxis={false} min={10} max={100} reversed {...this.propsFromProviders} />);
      expect(this.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" dimension="z" dynamicAxis={false} onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...this.propsFromProviders} />
      );
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'setExtremes', handleSetExtremes);
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-axis', 'afterSetExtremes', handleAfterSetExtremes);
    });
  });

  describe('update', function () {
    it('should update the axis if the component props change', function () {
      const wrapper = mount(
        <Axis id="myAxis" dimension="x" {...this.propsFromProviders} />
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
        <Axis id="myAxis" dimension="x" {...this.propsFromProviders} />
      );
      wrapper.unmount();
      expect(this.remove).to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the axis to the children', function () {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <Axis id="myAxis" dimension="x" {...this.propsFromProviders}>
          <ChildComponent />
        </Axis>
      ).children();
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { dimension: 'x', axisId: 'myAxis' }
      );
    });
  });
});
