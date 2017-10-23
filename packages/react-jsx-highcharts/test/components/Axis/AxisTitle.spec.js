import React from 'react';
import AxisTitle from '../../../src/components/Axis/AxisTitle';
import { createMockAxis } from '../../test-utils';

describe('<Axis.Title />', function ()  {
  beforeEach(function () {
    this.setTitle = sinon.spy();
  });

  describe('when mounted', function () {
    it('sets the correct axis title', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x" setTitle={this.setTitle}>My Axis Title</AxisTitle>);
      expect(this.setTitle).to.have.been.calledWith({
         text: 'My Axis Title', setTitle: this.setTitle
      });
    });

    it('should pass additional props too', function () {
      mount(<AxisTitle axisId="myAxis" dimension="x" align="high" setTitle={this.setTitle}>My Axis Title</AxisTitle>);
      expect(this.setTitle).to.have.been.calledWith({
         text: 'My Axis Title', align: 'high', setTitle: this.setTitle
      });
    });
  });

  describe('setTitle', function () {
    it('should setTitle the correct axis title if the component props change', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" setTitle={this.setTitle}>My Axis Title</AxisTitle>);
      wrapper.setProps({ axisId: 'myAxis', dimension: 'x', children: 'New Title' });
      expect(this.setTitle).to.have.been.calledWith({
         text: 'New Title'
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct axis title (if the axis still exists)', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" setTitle={this.setTitle} getAxis={createMockAxis}>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(this.setTitle).to.have.been.calledWith({
         text: null
      });
    });

    it('does nothing if the parent axis has already been removed', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" setTitle={this.setTitle} getAxis={() => undefined}>My Axis Title</AxisTitle>);
      this.setTitle.reset();
      wrapper.unmount();
      expect(this.setTitle).not.to.have.been.called;
    });
  });
});
