import React from 'react';
import AxisTitle from '../../../src/components/Axis/AxisTitle';
import { createMockAxis } from '../../test-utils';

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

    it('should pass additional props too', function () {
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
    it('removes the correct axis title (if the axis still exists)', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" update={this.update} getAxis={createMockAxis}>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        title: { text: null }
      });
    });

    it('does nothing if the parent axis has already been removed', function () {
      const wrapper = mount(<AxisTitle axisId="myAxis" dimension="x" update={this.update} getAxis={() => undefined}>My Axis Title</AxisTitle>);
      this.update.reset();
      wrapper.unmount();
      expect(this.update).not.to.have.been.called;
    });
  });
});
