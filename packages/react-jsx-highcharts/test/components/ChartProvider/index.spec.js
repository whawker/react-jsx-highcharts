import React, { Component } from 'react';
import { createMockChart } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';
import * as highchartsProvider from '../../../src/components/HighchartsProvider';
import { Provider } from '../../../src/components/ChartContext';
import provideChart from '../../../src/components/ChartProvider';

const WrappedComponent = props => (
  <div />
);
let ChartWrappedComponent;

describe('<ChartProvider />', function () {
  before(function () {
    this.highchartsProviderStub = sinon.stub(highchartsProvider, 'default').returnsArg(0);
  });

  beforeEach(function () {
    this.cleanSpy = sinon.spy(clean, 'default');

    this.chart = createMockChart();
    this.chartType = 'chart';

    ChartWrappedComponent = provideChart(WrappedComponent);
  });

  afterEach(function () {
    this.cleanSpy.restore();
  });

  after(function () {
    this.highchartsProviderStub.restore();
  });

  it('should not render the wrapped component if there is no chart context', function () {
    const wrapper = mount(
      <Provider value={{ chart: undefined, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.not.exist;
  });

  it('should render the wrapped component if there is a chart context', function () {
    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should additionally wrap the component with the Highcharts context', function () {
    mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(this.highchartsProviderStub).to.have.been.calledWith(ChartWrappedComponent);
  });

  it('should provide a getChart prop to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide chart functions when calling getChart', function () {
    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.object).to.equal(this.chart);
    expect(chart.type).to.equal(this.chartType);
    expect(chart.get).to.be.a('function');
    expect(chart.update).to.be.a('function');
    expect(chart.addAxis).to.be.a('function');
    expect(chart.addSeries).to.be.a('function');
    expect(chart.setTitle).to.be.a('function');
    expect(chart.showLoading).to.be.a('function');
    expect(chart.hideLoading).to.be.a('function');
    expect(chart.addCredits).to.be.a('function');
  });

  it('should provide expected chart functions when calling getChart', function () {
    this.chart.get.withArgs({ prop: 'Test1234' }).returns('get method mock');
    this.chart.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
    this.chart.addAxis.withArgs({ prop: 'Test4567' }).returns('addAxis method mock');
    this.chart.addSeries.withArgs({ prop: 'Test7654' }).returns('addSeries method mock');
    this.chart.setTitle.withArgs({ prop: 'Test8080' }).returns('setTitle method mock');
    this.chart.showLoading.withArgs({ prop: 'Test1111' }).returns('showLoading method mock');
    this.chart.hideLoading.withArgs({ prop: 'Test2222' }).returns('hideLoading method mock');
    this.chart.addCredits.withArgs({ prop: 'Test3333' }).returns('addCredits method mock');

    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).to.equal(this.chartType);
    expect(chart.get({ prop: 'Test1234' })).to.equal('get method mock');
    expect(chart.update({ prop: 'Test9876' })).to.equal('update method mock');
    expect(chart.addAxis({ prop: 'Test4567' })).to.equal('addAxis method mock');
    expect(chart.addSeries({ prop: 'Test7654' })).to.equal('addSeries method mock');
    expect(chart.setTitle({ prop: 'Test8080' })).to.equal('setTitle method mock');
    expect(chart.showLoading({ prop: 'Test1111' })).to.equal('showLoading method mock');
    expect(chart.hideLoading({ prop: 'Test2222' })).to.equal('hideLoading method mock');
    expect(chart.addCredits({ prop: 'Test3333' })).to.equal('addCredits method mock');
  });

  it('should provide chart functions bound to the chart when calling getChart', function () {
    this.chart.get.withArgs({ prop: 'Test1234' }).returnsThis();
    this.chart.update.withArgs({ prop: 'Test9876' }).returnsThis();
    this.chart.addAxis.withArgs({ prop: 'Test4567' }).returnsThis();
    this.chart.addSeries.withArgs({ prop: 'Test7654' }).returnsThis();
    this.chart.setTitle.withArgs({ prop: 'Test8080' }).returnsThis();
    this.chart.showLoading.withArgs({ prop: 'Test1111' }).returnsThis();
    this.chart.hideLoading.withArgs({ prop: 'Test2222' }).returnsThis();
    this.chart.addCredits.withArgs({ prop: 'Test3333' }).returnsThis();

    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: 'stockChart' }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).to.equal('stockChart');
    expect(chart.get({ prop: 'Test1234' })).to.equal(this.chart);
    expect(chart.update({ prop: 'Test9876' })).to.equal(this.chart);
    expect(chart.addAxis({ prop: 'Test4567' })).to.equal(this.chart);
    expect(chart.addSeries({ prop: 'Test7654' })).to.equal(this.chart);
    expect(chart.setTitle({ prop: 'Test8080' })).to.equal(this.chart);
    expect(chart.showLoading({ prop: 'Test1111' })).to.equal(this.chart);
    expect(chart.hideLoading({ prop: 'Test2222' })).to.equal(this.chart);
    expect(chart.addCredits({ prop: 'Test3333' })).to.equal(this.chart);
  });

  it('should provide chart functions which will be cleaned prior to being called', function () {
    const wrapper = mount(
      <Provider value={{ chart: this.chart, chartType: this.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addAxis', 'addSeries', 'setTitle', 'addCredits'];
    wrapper.find(WrappedComponent).props().getChart();
    expect(this.cleanSpy).to.have.callCount(cleanedFunctions.length);
  });
});
