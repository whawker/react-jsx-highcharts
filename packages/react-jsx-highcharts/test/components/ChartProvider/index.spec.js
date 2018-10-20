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

describe('<ChartProvider />', () => {
  let suiteContext;
  let testContext;

  beforeAll(function () {
    suiteContext = {};
    suiteContext.highchartsProviderStub = sinon.stub(highchartsProvider, 'default').returnsArg(0);
  });

  beforeEach(() => {
    testContext = {};
    testContext.cleanSpy = sinon.spy(clean, 'default');

    testContext.chart = createMockChart();
    testContext.chartType = 'chart';

    ChartWrappedComponent = provideChart(WrappedComponent);
  });

  afterEach(() => {
    testContext.cleanSpy.restore();
  });

  afterAll(function () {
    suiteContext.highchartsProviderStub.restore();
  });

  it('should not render the wrapped component if there is no chart context', () => {
    const wrapper = mount(
      <Provider value={{ chart: undefined, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.not.exist;
  });

  it('should render the wrapped component if there is a chart context', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should additionally wrap the component with the Highcharts context', () => {
    mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(suiteContext.highchartsProviderStub).to.have.been.calledWith(ChartWrappedComponent);
  });

  it('should provide a getChart prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide chart functions when calling getChart', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.object).to.equal(testContext.chart);
    expect(chart.type).to.equal(testContext.chartType);
    expect(chart.get).to.be.a('function');
    expect(chart.update).to.be.a('function');
    expect(chart.addAxis).to.be.a('function');
    expect(chart.addSeries).to.be.a('function');
    expect(chart.setTitle).to.be.a('function');
    expect(chart.showLoading).to.be.a('function');
    expect(chart.hideLoading).to.be.a('function');
    expect(chart.addCredits).to.be.a('function');
  });

  it('should provide expected chart functions when calling getChart', () => {
    testContext.chart.get.withArgs({ prop: 'Test1234' }).returns('get method mock');
    testContext.chart.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
    testContext.chart.addAxis.withArgs({ prop: 'Test4567' }).returns('addAxis method mock');
    testContext.chart.addSeries.withArgs({ prop: 'Test7654' }).returns('addSeries method mock');
    testContext.chart.setTitle.withArgs({ prop: 'Test8080' }).returns('setTitle method mock');
    testContext.chart.showLoading.withArgs({ prop: 'Test1111' }).returns('showLoading method mock');
    testContext.chart.hideLoading.withArgs({ prop: 'Test2222' }).returns('hideLoading method mock');
    testContext.chart.addCredits.withArgs({ prop: 'Test3333' }).returns('addCredits method mock');

    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).to.equal(testContext.chartType);
    expect(chart.get({ prop: 'Test1234' })).to.equal('get method mock');
    expect(chart.update({ prop: 'Test9876' })).to.equal('update method mock');
    expect(chart.addAxis({ prop: 'Test4567' })).to.equal('addAxis method mock');
    expect(chart.addSeries({ prop: 'Test7654' })).to.equal('addSeries method mock');
    expect(chart.setTitle({ prop: 'Test8080' })).to.equal('setTitle method mock');
    expect(chart.showLoading({ prop: 'Test1111' })).to.equal('showLoading method mock');
    expect(chart.hideLoading({ prop: 'Test2222' })).to.equal('hideLoading method mock');
    expect(chart.addCredits({ prop: 'Test3333' })).to.equal('addCredits method mock');
  });

  it('should provide chart functions bound to the chart when calling getChart', () => {
    testContext.chart.get.withArgs({ prop: 'Test1234' }).returnsThis();
    testContext.chart.update.withArgs({ prop: 'Test9876' }).returnsThis();
    testContext.chart.addAxis.withArgs({ prop: 'Test4567' }).returnsThis();
    testContext.chart.addSeries.withArgs({ prop: 'Test7654' }).returnsThis();
    testContext.chart.setTitle.withArgs({ prop: 'Test8080' }).returnsThis();
    testContext.chart.showLoading.withArgs({ prop: 'Test1111' }).returnsThis();
    testContext.chart.hideLoading.withArgs({ prop: 'Test2222' }).returnsThis();
    testContext.chart.addCredits.withArgs({ prop: 'Test3333' }).returnsThis();

    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: 'stockChart' }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).to.equal('stockChart');
    expect(chart.get({ prop: 'Test1234' })).to.equal(testContext.chart);
    expect(chart.update({ prop: 'Test9876' })).to.equal(testContext.chart);
    expect(chart.addAxis({ prop: 'Test4567' })).to.equal(testContext.chart);
    expect(chart.addSeries({ prop: 'Test7654' })).to.equal(testContext.chart);
    expect(chart.setTitle({ prop: 'Test8080' })).to.equal(testContext.chart);
    expect(chart.showLoading({ prop: 'Test1111' })).to.equal(testContext.chart);
    expect(chart.hideLoading({ prop: 'Test2222' })).to.equal(testContext.chart);
    expect(chart.addCredits({ prop: 'Test3333' })).to.equal(testContext.chart);
  });

  it('should provide chart functions which will be cleaned prior to being called', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addAxis', 'addSeries', 'setTitle', 'addCredits'];
    wrapper.find(WrappedComponent).props().getChart();
    expect(testContext.cleanSpy).to.have.callCount(cleanedFunctions.length);
  });
});
