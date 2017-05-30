import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highstock-release';
import BaseChart from '../../../src/components/BaseChart';
import { createMockChart } from '../../test-utils';

describe('<BaseChart />', function ()  {
  describe('on mount', function () {
    let clock;
    let sandbox;

    beforeEach(function () {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Highcharts, 'chart').returns(createMockChart());
      sandbox.stub(Highcharts, 'stockChart').returns(createMockChart());
      clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      sandbox.restore();
      clock.restore();
    });

    it('should create a Highcharts chart when chartType is chart', function () {
      const wrapper = mount(<BaseChart chartType="chart"/>);
      clock.tick(1);
      expect(Highcharts.chart).to.have.been.calledWith(wrapper.node.domNode);
      expect(Highcharts.stockChart).not.to.have.been.called;
    });

    it('should create a Highstocks chart when chartType is stockChart', function () {
      const wrapper = mount(<BaseChart chartType="stockChart"/>);
      clock.tick(1);
      expect(Highcharts.stockChart).to.have.been.calledWith(wrapper.node.domNode);
      expect(Highcharts.chart).not.to.have.been.called;
    });
  });
});
