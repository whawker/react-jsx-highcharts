import React from 'react';
import { mount } from 'enzyme';
import AxisTitle from '../../../src/components/Axis/AxisTitle';

describe('<Axis.Title />', function ()  {
  beforeEach(function () {
    this.axis = {
      update: sinon.spy()
    };
    this.otherAxis = {
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
    it('sets the correct axis title', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x">My Axis Title</AxisTitle>, {context: this.context});
      expect(this.axis.update).to.have.been.calledWith({
        title: {text: 'My Axis Title'}
      });
      expect(this.otherAxis.update).not.to.have.been.called;
    });

    it('adds should pass additional props too', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x" align="high">My Axis Title</AxisTitle>, {context: this.context});
      expect(this.axis.update).to.have.been.calledWith({
        title: { text: 'My Axis Title', align: 'high' }
      });
      expect(this.otherAxis.update).not.to.have.been.called;
    });
  });

  describe('update', function () {
    it('should update the correct axis title if the component props change', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x">My Axis Title</AxisTitle>, {context: this.context});
      wrapper.setProps({ axisId: 'myAxis', dimension: 'x', children: 'New Title' });
      expect(this.axis.update).to.have.been.calledWith({
        title: { text: 'New Title' }
      });
      expect(this.otherAxis.update).not.to.have.been.called;
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis title', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x">My Axis Title</AxisTitle>, {context: this.context});
      wrapper.unmount();
      expect(this.axis.update).to.have.been.calledWith({
        title: { text: null }
      });
      expect(this.otherAxis.update).not.to.have.been.called;
    });
  });
});
