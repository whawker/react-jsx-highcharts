import React from 'react';
import { mount } from 'enzyme';
import Axis from '../../../src/components/Axis/Axis';

describe('<Axis />', function ()  {
  beforeEach(function () {
    this.addAxis = sinon.spy();
    this.get = sinon.spy();
    this.remove = sinon.spy();
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds an X axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" addAxis={this.addAxis} get={this.get} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', get: this.get }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="y" addAxis={this.addAxis} get={this.get} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', get: this.get }, false, true
      );
    });

    it('adds should pass additional props through to Highcharts addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" min={10} max={100} reversed addAxis={this.addAxis} get={this.get} />);
      expect(this.addAxis).to.have.been.calledWith(
        { id: 'myAxis', min: 10, max: 100, reversed: true, get: this.get }, true, true
      );
    });
  });

  describe('update', function () {
    it('should update the axis if the component props change', function () {
      const wrapper = mount(
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} get={this.get} update={this.update} />
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
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} get={this.get} remove={this.remove} />
      );
      wrapper.unmount();
      expect(this.remove).to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the axis to the children', function () {
      const ChildComponent = props => (<div />);

      const child = mount(
        <Axis id="myAxis" dimension="x" addAxis={this.addAxis} get={this.get}>
          <ChildComponent />
        </Axis>
      ).children();
      expect(child.props()).to.eql(
        { dimension: 'x', axisId: 'myAxis' }
      );
    });
  });
});
