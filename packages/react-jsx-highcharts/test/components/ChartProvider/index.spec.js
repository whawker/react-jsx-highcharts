import React, { Component } from 'react';
import PropTypes from 'prop-types';
import provideChart from '../../../src/components/ChartProvider';
import { Highcharts, createMockChart } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);
const ChartWrappedComponent = provideChart(WrappedComponent);

describe('<ChartProvider />', function () {

  beforeEach(function () {
    this.chart = createMockChart();
    this.chartType = 'my-mock-chart-type';

    const context = {
      chart: this.chart,
      chartType: this.chartType,
      Highcharts
    };
    const childContextTypes = {
      chart: PropTypes.object,
      chartType: PropTypes.string,
      Highcharts: PropTypes.object
    };
    this.opts = {
      context,
      childContextTypes
    };
  });

  describe('provided prop functions', function () {
    beforeEach(function () {
      this.chart.get.withArgs({ prop: 'Test1234' }).returns('get method mock');
      this.chart.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
      this.chart.addAxis.withArgs({ prop: 'Test4567' }).returns('addAxis method mock');
      this.chart.addSeries.withArgs({ prop: 'Test7654' }).returns('addSeries method mock');
      this.chart.setTitle.withArgs({ prop: 'Test8080' }).returns('setTitle method mock');
      this.chart.showLoading.withArgs({ prop: 'Test1111' }).returns('showLoading method mock');
      this.chart.hideLoading.withArgs({ prop: 'Test2222' }).returns('hideLoading method mock');
    });

    it('should pass the `get` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().get({ prop: 'Test1234' })).to.eql('get method mock');
    });

    it('should pass the `update` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.find(WrappedComponent).props().update({ prop: 'Test9876' })).to.eql('update method mock');
    });

    it('should pass the `addAxis` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().addAxis({ prop: 'Test4567' })).to.eql('addAxis method mock');
    });

    it('should pass the `addSeries` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().addSeries({ prop: 'Test7654' })).to.eql('addSeries method mock');
    });

    it('should pass the `setTitle` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().setTitle({ prop: 'Test8080' })).to.eql('setTitle method mock');
    });

    it('should pass the `showLoading` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().showLoading({ prop: 'Test1111' })).to.eql('showLoading method mock');
    });

    it('should pass the `hideLoading` function of Highcharts to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().hideLoading({ prop: 'Test2222' })).to.eql('hideLoading method mock');
    });

    it('should pass the `getChart` helper function to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().getChart()).to.eql(this.chart);
    });

    it('should pass the `getChartType` helper function to the wrapped component', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().getChartType()).to.eql(this.chartType);
    });

    it('should pass all other props through to the WrappedComponent', function () {
      const wrapper = mount(<ChartWrappedComponent prop1="bob" prop264="dave" />, this.opts).find(WrappedComponent);
      expect(wrapper.props().prop1).to.eql('bob');
      expect(wrapper.props().prop264).to.eql('dave');
    });
  });

  describe('properly scoped prop functions', function () {
    beforeEach(function () {
      this.chart.get.withArgs({ prop: 'Test1234' }).returnsThis();
      this.chart.update.withArgs({ prop: 'Test9876' }).returnsThis();
      this.chart.addAxis.withArgs({ prop: 'Test4567' }).returnsThis();
      this.chart.addSeries.withArgs({ prop: 'Test7654' }).returnsThis();
      this.chart.setTitle.withArgs({ prop: 'Test8080' }).returnsThis();
      this.chart.showLoading.withArgs({ prop: 'Test1111' }).returnsThis();
      this.chart.hideLoading.withArgs({ prop: 'Test2222' }).returnsThis();
    });

    it('the scope of the `get` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().get({ prop: 'Test1234' })).to.eql(this.chart);
    });

    it('the scope of the `update` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().update({ prop: 'Test9876' })).to.eql(this.chart);
    });

    it('the scope of the `addAxis` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().addAxis({ prop: 'Test4567' })).to.eql(this.chart);
    });

    it('the scope of the `addSeries` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().addSeries({ prop: 'Test7654' })).to.eql(this.chart);
    });

    it('the scope of the `setTitle` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().setTitle({ prop: 'Test8080' })).to.eql(this.chart);
    });

    it('the scope of the `showLoading` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().showLoading({ prop: 'Test1111' })).to.eql(this.chart);
    });

    it('the scope of the `hideLoading` function should be bound to the chart', function () {
      const wrapper = mount(<ChartWrappedComponent />, this.opts).find(WrappedComponent);
      expect(wrapper.props().hideLoading({ prop: 'Test2222' })).to.eql(this.chart);
    });
  });
});
