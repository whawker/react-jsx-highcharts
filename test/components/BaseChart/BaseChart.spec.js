import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import Highcharts from 'highstock-release';
import BaseChart from '../../../src/components/BaseChart';
import { createMockChart } from '../../test-utils';

class ChartContextReceiver extends PureComponent {
  static contextTypes = {
    chart: PropTypes.object,
    chartType: PropTypes.string
  };

  render () {
    return (
      <div />
    );
  }
}

describe('<BaseChart />', function ()  {
  describe('on mount', function () {
    let clock;
    let sandbox;
    let chart;

    beforeEach(function () {
      chart = createMockChart();
      sandbox = sinon.sandbox.create();
      sandbox.stub(Highcharts, 'chart').returns(chart);
      sandbox.stub(Highcharts, 'stockChart').returns(chart);
      clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      sandbox.restore();
      clock.restore();
    });

    describe('chartType = chart', function () {
      it('should create a Highcharts chart', function () {
        const wrapper = mount(<BaseChart chartType="chart"/>);
        clock.tick(1);
        expect(Highcharts.chart).to.have.been.calledWith(wrapper.node.domNode);
        expect(Highcharts.stockChart).not.to.have.been.called;
      });

      it('should create a chart context', function () {
        const wrapper = mount(
          <BaseChart chartType="chart">
            <ChartContextReceiver />
          </BaseChart>
        );
        clock.tick(1);
        const child = wrapper.find(ChartContextReceiver).getNode();
        expect(child.context.chart).to.eql(chart);
        expect(child.context.chartType).to.eql('chart');
      });
    });

    describe('chartType = stockChart', function () {
      it('should create a Highstocks chart', function () {
        const wrapper = mount(<BaseChart chartType="stockChart"/>);
        clock.tick(1);
        expect(Highcharts.stockChart).to.have.been.calledWith(wrapper.node.domNode);
        expect(Highcharts.chart).not.to.have.been.called;
      });

      it('should create a chart context', function () {
        const wrapper = mount(
          <BaseChart chartType="stockChart">
            <ChartContextReceiver />
          </BaseChart>
        );
        clock.tick(1);
        const child = wrapper.find(ChartContextReceiver).getNode();
        expect(child.context.chart).to.eql(chart);
        expect(child.context.chartType).to.eql('stockChart');
      });
    });
  });
});
