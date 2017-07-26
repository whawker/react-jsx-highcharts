import React from 'react';
import { mount } from 'enzyme';
import AxisTitle from '../../../src/components/Axis/AxisTitle';

describe('<Axis.Title />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  describe('when mounted', function () {
    it('sets the correct axis title', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x" update={this.update}>My Axis Title</AxisTitle>);
      expect(this.update).to.have.been.calledWith({
        title: { text: 'My Axis Title', update: this.update }
      });
    });

    it('adds should pass additional props too', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x" align="high" update={this.update}>My Axis Title</AxisTitle>);
      expect(this.update).to.have.been.calledWith({
        title: { text: 'My Axis Title', align: 'high', update: this.update }
      });
    });
  });

  describe('update', function () {
    it('should update the correct axis title if the component props change', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" update={this.update}>My Axis Title</AxisTitle>);
      wrapper.setProps({ axisId: 'myAxis', dimension: 'x', children: 'New Title' });
      expect(this.update).to.have.been.calledWith({
        title: { text: 'New Title' }
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis title', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" update={this.update}>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        title: { text: null }
      });
    });
  });
});
