import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import AxisTitle from '../../../src/components/Axis/AxisTitle';

describe('<Axis.Title />', function ()  {
  beforeEach(function () {
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    this.axisStubs = axisStubs;

    this.propsFromProviders = {
      getAxis
    };
  });

  context('when mounted', function () {
    it('sets the correct axis title', function () {
      mount(<AxisTitle {...this.propsFromProviders}>My Axis Title</AxisTitle>);
      expect(this.axisStubs.setTitle).to.have.been.calledWithMatch({
         text: 'My Axis Title'
      });
    });

    it('should pass additional props too', function () {
      mount(<AxisTitle {...this.propsFromProviders} align="high">My Axis Title</AxisTitle>);
      expect(this.axisStubs.setTitle).to.have.been.calledWithMatch({
         text: 'My Axis Title', align: 'high'
      });
    });
  });

  context('update', function () {
    it('should setTitle the correct axis title if the component props change', function () {
      const wrapper = mount(<AxisTitle {...this.propsFromProviders}>My Axis Title</AxisTitle>);
      wrapper.setProps({ axisId: 'myAxis', dimension: 'x', children: 'New Title' });
      expect(this.axisStubs.setTitle).to.have.been.calledWithMatch({
         text: 'New Title'
      });
    });
  });

  context('when unmounted', function () {
    it('removes the correct axis title (if the axis still exists)', function () {
      const wrapper = mount(<AxisTitle {...this.propsFromProviders}>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(this.axisStubs.setTitle).to.have.been.calledWithMatch({
         text: null
      });
    });
  });
});
