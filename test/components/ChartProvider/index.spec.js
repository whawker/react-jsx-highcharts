import React, { Component } from 'react';
import { shallow } from 'enzyme';
import provideChart from '../../../src/components/ChartProvider';
import { createMockChart } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);
const ChartWrappedComponent = provideChart(WrappedComponent);

describe('<ChartProvider />', function () {

  beforeEach(function () {
    this.chart = createMockChart();
    this.chartType = 'my-mock-chart-type';

    this.context = {
      chart: this.chart,
      chartType: this.chartType
    };
  });

  describe('provided prop functions', function () {
    beforeEach(function () {
      this.chart.get.withArgs({ prop: 'Test1234' }).returns('get method mock');
      this.chart.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
      this.chart.addAxis.withArgs({ prop: 'Test4567' }).returns('addAxis method mock');
      this.chart.addSeries.withArgs({ prop: 'Test7654' }).returns('addSeries method mock');
      this.chart.setTitle.withArgs({ prop: 'Test8080' }).returns('setTitle method mock');
    });

    it('should pass the `get` function of Highcharts to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().get({ prop: 'Test1234' })).to.eql('get method mock');
    });

    it('should pass the `update` function of Highcharts to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.find(WrappedComponent).props().update({ prop: 'Test9876' })).to.eql('update method mock');
    });

    it('should pass the `addAxis` function of Highcharts to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().addAxis({ prop: 'Test4567' })).to.eql('addAxis method mock');
    });

    it('should pass the `addSeries` function of Highcharts to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().addSeries({ prop: 'Test7654' })).to.eql('addSeries method mock');
    });

    it('should pass the `setTitle` function of Highcharts to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setTitle({ prop: 'Test8080' })).to.eql('setTitle method mock');
    });

    it('should pass the `getChart` helper function to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().getChart()).to.eql(this.chart);
    });

    it('should pass the `getChartType` helper function to the wrapped component', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().getChartType()).to.eql(this.chartType);
    });

    it('should pass all other props through to the WrappedComponent', function () {
      const wrapper = shallow(<ChartWrappedComponent prop1="bob" prop264="dave" />, {context: this.context}).find(WrappedComponent);
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
    });

    it('the scope of the `get` function should be bound to the chart', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().get({ prop: 'Test1234' })).to.eql(this.chart);
    });

    it('the scope of the `update` function should be bound to the chart', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().update({ prop: 'Test9876' })).to.eql(this.chart);
    });

    it('the scope of the `addAxis` function should be bound to the chart', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().addAxis({ prop: 'Test4567' })).to.eql(this.chart);
    });

    it('the scope of the `addSeries` function should be bound to the chart', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().addSeries({ prop: 'Test7654' })).to.eql(this.chart);
    });

    it('the scope of the `setTitle` function should be bound to the chart', function () {
      const wrapper = shallow(<ChartWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().setTitle({ prop: 'Test8080' })).to.eql(this.chart);
    });
  });
});
