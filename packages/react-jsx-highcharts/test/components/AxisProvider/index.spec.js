import React, { Component } from 'react';
import { createMockAxis } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';
import * as DelayRender from '../../../src/components/DelayRender';
import { Provider } from '../../../src/components/AxisContext';
import provideAxis from '../../../src/components/AxisProvider';
import ChartContext from '../../../src/components/ChartContext';

const WrappedComponent = props => (
  <div />
);
let AxisWrappedComponent;

describe('<AxisProvider />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.delayRenderStub = jest.spyOn(DelayRender, 'default').mockImplementation(({ children }) => ( <div>{children}</div> ));

    testContext.cleanSpy = jest.spyOn(clean, 'default');
    testContext.axis = createMockAxis({
      userOptions: { id: 'myAxisId' },
      coll: 'yAxis'
    });
    testContext.get = jest.fn().mockReturnValue(testContext.axis)

    let AxisProvidedComponent = provideAxis(WrappedComponent);

    AxisWrappedComponent = props => (
      <ChartContext.Provider value={{ getChart: () => ({ get: testContext.get }) }}>
        <AxisProvidedComponent {...props} />
      </ChartContext.Provider>
    );
  });

  afterEach(() => {
    //testContext.chartProviderStub.mockClear();
    testContext.cleanSpy.mockClear();
    //testContext.delayRenderStub.restore();
  });


  it('should render the wrapped component even if there is no axis context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should render the wrapped component if there is an axis context', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should render the wrapped component if it does not require an axis, and there is no axis context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should render the wrapped component if it does not require an axis, and there is an axis context', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should provide a getAxis prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).toEqual(expect.any(Function))
  });

  it('should render the wrapped component if there is an axisId, and there is no axis context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent axisId='my-passed-axis-id' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should get the axis using the passed axisId', () => {
    mount(
      <Provider value={undefined}>
        <AxisWrappedComponent axisId='my-passed-axis-id' />
      </Provider>
    );

    expect(testContext.get).toHaveBeenCalledWith('my-passed-axis-id')
  });

  it('should provide a getAxis prop to the wrapped component when passing an axisId', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent axisId='my-passed-axis-id' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).toEqual(expect.any(Function))
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).toEqual(expect.any(Function))
    expect(wrapper.find(WrappedComponent).prop('someProp')).toBe('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).toBe('otherValue');
  });

  it('should provide axis functions when calling getAxis', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.object).toEqual(testContext.axis);
    expect(axis.id).toBe('myAxisId');
    expect(axis.type).toBe('yAxis');
    expect(axis.update).toEqual(expect.any(Function))
    expect(axis.remove).toEqual(expect.any(Function))
    expect(axis.addPlotBand).toEqual(expect.any(Function))
    expect(axis.removePlotBand).toEqual(expect.any(Function))
    expect(axis.addPlotLine).toEqual(expect.any(Function))
    expect(axis.removePlotLine).toEqual(expect.any(Function))
    expect(axis.getExtremes).toEqual(expect.any(Function))
    expect(axis.setExtremes).toEqual(expect.any(Function))
    expect(axis.setTitle).toEqual(expect.any(Function))
  });

  it('should provide expected axis functions when calling getAxis', () => {
    testContext.axis.update.mockReturnValueOnce('update method mock');
    testContext.axis.remove.mockReturnValueOnce('remove method mock');
    testContext.axis.addPlotBand.mockReturnValueOnce('addPlotBand method mock');
    testContext.axis.removePlotBand.mockReturnValueOnce('removePlotBand method mock');
    testContext.axis.addPlotLine.mockReturnValueOnce('addPlotLine method mock');
    testContext.axis.removePlotLine.mockReturnValueOnce('removePlotLine method mock');
    testContext.axis.getExtremes.mockReturnValueOnce('getExtremes method mock');
    testContext.axis.setExtremes.mockReturnValueOnce('setExtremes method mock');
    testContext.axis.setTitle.mockReturnValueOnce('setTitle method mock');

    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.update({ prop: 'Test9876' })).toBe('update method mock');
    expect(axis.remove({ prop: 'Test1234' })).toBe('remove method mock');
    expect(axis.addPlotBand({ prop: 'Test4567' })).toBe('addPlotBand method mock');
    expect(axis.removePlotBand({ prop: 'Test7654' })).toBe('removePlotBand method mock');
    expect(axis.addPlotLine({ prop: 'Test4444' })).toBe('addPlotLine method mock');
    expect(axis.removePlotLine({ prop: 'Test5555' })).toBe('removePlotLine method mock');
    expect(axis.getExtremes({ prop: 'Test6666' })).toBe('getExtremes method mock');
    expect(axis.setExtremes({ prop: 'Test7777' })).toBe('setExtremes method mock');
    expect(axis.setTitle({ prop: 'Test8888' })).toBe('setTitle method mock');
  });

  it('should provide axis functions bound to the axis when calling getAxis', () => {
    testContext.axis.update.mockReturnThis();
    testContext.axis.remove.mockReturnThis();
    testContext.axis.addPlotBand.mockReturnThis();
    testContext.axis.removePlotBand.mockReturnThis();
    testContext.axis.addPlotLine.mockReturnThis();
    testContext.axis.removePlotLine.mockReturnThis();
    testContext.axis.getExtremes.mockReturnThis();
    testContext.axis.setExtremes.mockReturnThis();
    testContext.axis.setTitle.mockReturnThis();

    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.update({ prop: 'Test9876' })).toEqual(testContext.axis);
    expect(axis.remove({ prop: 'Test1234' })).toEqual(testContext.axis);
    expect(axis.addPlotBand({ prop: 'Test4567' })).toEqual(testContext.axis);
    expect(axis.removePlotBand({ prop: 'Test7654' })).toEqual(testContext.axis);
    expect(axis.addPlotLine({ prop: 'Test4444' })).toEqual(testContext.axis);
    expect(axis.removePlotLine({ prop: 'Test5555' })).toEqual(testContext.axis);
    expect(axis.getExtremes({ prop: 'Test6666' })).toEqual(testContext.axis);
    expect(axis.setExtremes({ prop: 'Test7777' })).toEqual(testContext.axis);
    expect(axis.setTitle({ prop: 'Test8888' })).toEqual(testContext.axis);
  });

  it('should provide axis functions which will be cleaned prior to being called', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addPlotBand', 'addPlotLine', 'setTitle'];
    wrapper.find(WrappedComponent).props().getAxis();
    expect(testContext.cleanSpy).toHaveBeenCalledTimes(cleanedFunctions.length);
  });
});
