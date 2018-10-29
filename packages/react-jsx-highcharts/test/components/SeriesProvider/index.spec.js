import React, { Component } from 'react';
import { createMockSeries } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';
import * as axisProvider from '../../../src/components/AxisProvider';
import * as DelayRender from '../../../src/components/DelayRender';
import { Provider } from '../../../src/components/SeriesContext';
import provideSeries from '../../../src/components/SeriesProvider';

const WrappedComponent = props => (
  <div />
);
let SeriesWrappedComponent;

describe('<SeriesProvider />', () => {
  let suiteContext;
  let testContext;

  beforeAll(function () {
    suiteContext = {};
    suiteContext.axisProviderStub = jest.spyOn(axisProvider, 'default').mockImplementation(x => x)
    suiteContext.delayRenderStub = jest.spyOn(DelayRender, 'default').mockImplementation(({ children }) => ( <div>{children}</div> ));
  });

  beforeEach(() => {
    testContext = {};
    testContext.cleanSpy = jest.spyOn(clean, 'default');
    testContext.series = createMockSeries({
      userOptions: { id: 'mySeriesId' },
      type: 'areaspline'
    });

    SeriesWrappedComponent = provideSeries(WrappedComponent);
  });

  afterEach(() => {
    testContext.cleanSpy.mockClear();
  });

  afterAll(function () {
    suiteContext.axisProviderStub.restore();
    suiteContext.delayRenderStub.restore();
  });

  it('should not render the wrapped component if there is no series context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).not.toExist();
  });

  it('should render the wrapped component if there is an series context', () => {
    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should additionally wrap the component with the axis context', () => {
    mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(suiteContext.axisProviderStub).toHaveBeenCalledWith(SeriesWrappedComponent);
  });

  it('should provide a getSeries prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getSeries')).toEqual(expect.any(Function))
  });

  it('should render the wrapped component if there is a seriesId, and there is no series context', () => {
    const get = jest.fn().mockReturnValue(testContext.series)
    const wrapper = mount(
      <Provider value={undefined}>
        <SeriesWrappedComponent getChart={() => ({ get })} seriesId='my-passed-series-id' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should get the axis using the passed seriesId', () => {
    const get = jest.fn().mockReturnValue(testContext.series)
    mount(
      <Provider value={undefined}>
        <SeriesWrappedComponent getChart={() => ({ get })} seriesId='my-passed-series-id' />
      </Provider>
    );

    expect(get).toHaveBeenCalledWith('my-passed-series-id')
  });

  it('should provide a getSeries prop to the wrapped component when passing a seriesId', () => {
    const get = jest.fn().mockReturnValue(testContext.series)
    const wrapper = mount(
      <Provider value={undefined}>
        <SeriesWrappedComponent getChart={() => ({ get })} seriesId='my-passed-series-id' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getSeries')).toEqual(expect.any(Function))
  });


  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getSeries')).toEqual(expect.any(Function))
    expect(wrapper.find(WrappedComponent).prop('someProp')).toEqual('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).toEqual('otherValue');
  });

  it('should provide series functions when calling getSeries', () => {
    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.object).toEqual(testContext.series);
    expect(series.id).toEqual('mySeriesId');
    expect(series.type).toEqual('areaspline');
    expect(series.update).toEqual(expect.any(Function))
    expect(series.remove).toEqual(expect.any(Function))
    expect(series.setData).toEqual(expect.any(Function))
    expect(series.setVisible).toEqual(expect.any(Function))
  });

  it('should provide expected series functions when calling getSeries', () => {
    testContext.series.update.mockReturnValueOnce('update method mock');
    testContext.series.remove.mockReturnValueOnce('remove method mock');
    testContext.series.setData.mockReturnValueOnce('setData method mock');
    testContext.series.setVisible.mockReturnValueOnce('setVisible method mock');

    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.update({ prop: 'Test9876' })).toEqual('update method mock');
    expect(series.remove({ prop: 'Test1234' })).toEqual('remove method mock');
    expect(series.setData({ prop: 'Test4567' })).toEqual('setData method mock');
    expect(series.setVisible({ prop: 'Test7654' })).toEqual('setVisible method mock');
  });

  it('should provide series functions bound to the series when calling getSeries', () => {
    testContext.series.update.mockReturnThis();
    testContext.series.remove.mockReturnThis();
    testContext.series.setData.mockReturnThis();
    testContext.series.setVisible.mockReturnThis();

    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.update({ prop: 'Test9876' })).toEqual(testContext.series);
    expect(series.remove({ prop: 'Test1234' })).toEqual(testContext.series);
    expect(series.setData({ prop: 'Test4567' })).toEqual(testContext.series);
    expect(series.setVisible({ prop: 'Test7654' })).toEqual(testContext.series);
  });

  it('should provide series functions which will be cleaned prior to being called', () => {
    const wrapper = mount(
      <Provider value={testContext.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update'];
    wrapper.find(WrappedComponent).props().getSeries();
    expect(testContext.cleanSpy).toHaveBeenCalledTimes(cleanedFunctions.length);
  });
});
