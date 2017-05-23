import React from 'react';
import { mount } from 'enzyme';
import Axis from '../../../src/components/Axis';

describe('<Axis />', function ()  {
  beforeEach(function () {
    this.axis = {
      remove: sinon.spy(),
      update: sinon.spy()
    };
    this.otherAxis = {
      remove: sinon.spy(),
      update: sinon.spy()
    };

    const getStub = sinon.stub();
    getStub.withArgs('myAxis').returns(this.axis);
    getStub.withArgs('myOtherAxis').returns(this.otherAxis);

    this.chart = {
      addAxis: sinon.spy(),
      get: getStub
    };

    this.context = {
      chart: this.chart
    };
  });

  describe('when mounted', function () {
    it('adds an X axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" />, {context: this.context});
      expect(this.chart.addAxis).to.have.been.calledWith(
        { id: 'myAxis' }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', function () {
      mount(<Axis id="myAxis" dimension="y" />, {context: this.context});
      expect(this.chart.addAxis).to.have.been.calledWith(
        { id: 'myAxis' }, false, true
      );
    });

    it('adds should pass additional props through to Highcharts addAxis method', function () {
      mount(<Axis id="myAxis" dimension="x" min={10} max={100} reversed />, {context: this.context});
      expect(this.chart.addAxis).to.have.been.calledWith(
        { id: 'myAxis', min: 10, max: 100, reversed: true }, true, true
      );
    });
  });

  describe('update', function () {
    it('should update the correct axis if the component props change', function () {
      const wrapper = mount(<Axis id="myAxis" dimension="x" />, {context: this.context});
      wrapper.setProps({ id: 'myAxis', dimension: 'x', newPropName: 'newPropValue' });
      expect(this.axis.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(this.otherAxis.update).not.to.have.been.called;
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis', function () {
      const wrapper = mount(<Axis id="myAxis" dimension="x" />, {context: this.context});
      wrapper.unmount();
      expect(this.axis.remove).to.have.been.called;
      expect(this.otherAxis.remove).not.to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the axis to the children', function () {
      const child = mount(<Axis id="myAxis" dimension="x"><Axis.Title /></Axis>, {context: this.context}).children();
      expect(child.props()).to.eql(
        { dimension: 'x', axisId: 'myAxis' }
      );
    });
  });
});
