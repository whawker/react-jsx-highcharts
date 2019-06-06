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
    suiteContext.highchartsProviderStub = jest.spyOn(highchartsProvider, 'default').mockImplementation(v => v);
  });

  beforeEach(() => {
    testContext = {};
    testContext.cleanSpy = jest.spyOn(clean, 'default');

    testContext.chart = createMockChart();
    testContext.chartType = 'chart';

    ChartWrappedComponent = provideChart(WrappedComponent);
  });

  afterEach(() => {
    testContext.cleanSpy.mockClear();
  });

  afterAll(function () {
    //suiteContext.highchartsProviderStub.reset();
  });

  it('should not render the wrapped component if there is no chart context', () => {
    const wrapper = mount(
      <Provider value={{ chart: undefined, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).not.toExist();
  });

  it('should render the wrapped component if there is a chart context', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should additionally wrap the component with the Highcharts context', () => {
    mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(suiteContext.highchartsProviderStub).toHaveBeenCalledWith(ChartWrappedComponent);
  });

  it('should provide a getChart prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).toEqual(expect.any(Function));
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).toEqual(expect.any(Function));
    expect(wrapper.find(WrappedComponent).prop('someProp')).toEqual('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).toEqual('otherValue');
  });

  it('should provide chart functions when calling getChart', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.object).toEqual(testContext.chart);
    expect(chart.type).toEqual(testContext.chartType);
    expect(chart.get).toEqual(expect.any(Function));
    expect(chart.setSize).toEqual(expect.any(Function));
    expect(chart.update).toEqual(expect.any(Function));
    expect(chart.addAxis).toEqual(expect.any(Function));
    expect(chart.addSeries).toEqual(expect.any(Function));
    expect(chart.setTitle).toEqual(expect.any(Function));
    expect(chart.showLoading).toEqual(expect.any(Function));
    expect(chart.hideLoading).toEqual(expect.any(Function));
    expect(chart.addCredits).toEqual(expect.any(Function));
  });

  it('should provide expected chart functions when calling getChart', () => {
    testContext.chart.get.mockReturnValueOnce('get method mock');
    testContext.chart.setSize.mockReturnValueOnce('setSize method mock');
    testContext.chart.update.mockReturnValueOnce('update method mock');
    testContext.chart.addAxis.mockReturnValueOnce('addAxis method mock');
    testContext.chart.addSeries.mockReturnValueOnce('addSeries method mock');
    testContext.chart.setTitle.mockReturnValueOnce('setTitle method mock');
    testContext.chart.showLoading.mockReturnValueOnce('showLoading method mock');
    testContext.chart.hideLoading.mockReturnValueOnce('hideLoading method mock');
    testContext.chart.addCredits.mockReturnValueOnce('addCredits method mock');

    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).toEqual(testContext.chartType);
    expect(chart.get({ prop: 'Test1234' })).toEqual('get method mock');
    expect(chart.setSize({ prop: 'Test5678' })).toEqual('setSize method mock');
    expect(chart.update({ prop: 'Test9876' })).toEqual('update method mock');
    expect(chart.addAxis({ prop: 'Test4567' })).toEqual('addAxis method mock');
    expect(chart.addSeries({ prop: 'Test7654' })).toEqual('addSeries method mock');
    expect(chart.setTitle({ prop: 'Test8080' })).toEqual('setTitle method mock');
    expect(chart.showLoading({ prop: 'Test1111' })).toEqual('showLoading method mock');
    expect(chart.hideLoading({ prop: 'Test2222' })).toEqual('hideLoading method mock');
    expect(chart.addCredits({ prop: 'Test3333' })).toEqual('addCredits method mock');
  });

  it('should provide chart functions bound to the chart when calling getChart', () => {
    testContext.chart.get.mockReturnThis();
    testContext.chart.setSize.mockReturnThis();
    testContext.chart.update.mockReturnThis();
    testContext.chart.addAxis.mockReturnThis();
    testContext.chart.addSeries.mockReturnThis();
    testContext.chart.setTitle.mockReturnThis();
    testContext.chart.showLoading.mockReturnThis();
    testContext.chart.hideLoading.mockReturnThis();
    testContext.chart.addCredits.mockReturnThis();

    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: 'stockChart' }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const chart = wrapper.find(WrappedComponent).props().getChart();
    expect(chart.type).toEqual('stockChart');
    expect(chart.get({ prop: 'Test1234' })).toEqual(testContext.chart);
    expect(chart.setSize({ prop: 'Test5678' })).toEqual(testContext.chart);
    expect(chart.update({ prop: 'Test9876' })).toEqual(testContext.chart);
    expect(chart.addAxis({ prop: 'Test4567' })).toEqual(testContext.chart);
    expect(chart.addSeries({ prop: 'Test7654' })).toEqual(testContext.chart);
    expect(chart.setTitle({ prop: 'Test8080' })).toEqual(testContext.chart);
    expect(chart.showLoading({ prop: 'Test1111' })).toEqual(testContext.chart);
    expect(chart.hideLoading({ prop: 'Test2222' })).toEqual(testContext.chart);
    expect(chart.addCredits({ prop: 'Test3333' })).toEqual(testContext.chart);
  });

  it('should provide chart functions which will be cleaned prior to being called', () => {
    const wrapper = mount(
      <Provider value={{ chart: testContext.chart, chartType: testContext.chartType }}>
        <ChartWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addAxis', 'addSeries', 'setTitle', 'addCredits'];
    wrapper.find(WrappedComponent).props().getChart();
    expect(testContext.cleanSpy).toHaveBeenCalledTimes(cleanedFunctions.length);
  });
});
