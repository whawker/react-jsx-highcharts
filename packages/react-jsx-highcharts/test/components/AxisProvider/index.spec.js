import React, { Component } from 'react';
import { createMockAxis } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';
import * as chartProvider from '../../../src/components/ChartProvider';
import * as DelayRender from '../../../src/components/DelayRender';
import { Provider } from '../../../src/components/AxisContext';
import provideAxis from '../../../src/components/AxisProvider';

const WrappedComponent = props => (
  <div />
);
let AxisWrappedComponent;

describe('<AxisProvider />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.chartProviderStub = sinon.stub(chartProvider, 'default').returnsArg(0);
    testContext.delayRenderStub = sinon.stub(DelayRender, 'default').callsFake(({ children }) => ( <div>{children}</div> ));

    testContext.cleanSpy = sinon.spy(clean, 'default');
    testContext.axis = createMockAxis({
      userOptions: { id: 'myAxisId' },
      coll: 'yAxis'
    });

    AxisWrappedComponent = provideAxis(WrappedComponent);
  });

  afterEach(() => {
    testContext.chartProviderStub.resetHistory();
    testContext.cleanSpy.restore();
    testContext.chartProviderStub.restore();
    testContext.delayRenderStub.restore();
  });


  it('should not render the wrapped component if there is no axis context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.not.exist;
  });

  it('should render the wrapped component if there is an axis context', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should render the wrapped component if it does not require an axis, and there is no axis context', () => {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should render the wrapped component if it does not require an axis, and there is an axis context', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should additionally wrap the component with the chart context', () => {
    mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(testContext.chartProviderStub).to.have.been.calledWith(AxisWrappedComponent);
  });

  it('should provide a getAxis prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide axis functions when calling getAxis', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.object).to.equal(testContext.axis);
    expect(axis.id).to.equal('myAxisId');
    expect(axis.type).to.equal('yAxis');
    expect(axis.update).to.be.a('function');
    expect(axis.remove).to.be.a('function');
    expect(axis.addPlotBand).to.be.a('function');
    expect(axis.removePlotBand).to.be.a('function');
    expect(axis.addPlotLine).to.be.a('function');
    expect(axis.removePlotLine).to.be.a('function');
    expect(axis.getExtremes).to.be.a('function');
    expect(axis.setExtremes).to.be.a('function');
    expect(axis.setTitle).to.be.a('function');
  });

  it('should provide expected axis functions when calling getAxis', () => {
    testContext.axis.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
    testContext.axis.remove.withArgs({ prop: 'Test1234' }).returns('remove method mock');
    testContext.axis.addPlotBand.withArgs({ prop: 'Test4567' }).returns('addPlotBand method mock');
    testContext.axis.removePlotBand.withArgs({ prop: 'Test7654' }).returns('removePlotBand method mock');
    testContext.axis.addPlotLine.withArgs({ prop: 'Test4444' }).returns('addPlotLine method mock');
    testContext.axis.removePlotLine.withArgs({ prop: 'Test5555' }).returns('removePlotLine method mock');
    testContext.axis.getExtremes.withArgs({ prop: 'Test6666' }).returns('getExtremes method mock');
    testContext.axis.setExtremes.withArgs({ prop: 'Test7777' }).returns('setExtremes method mock');
    testContext.axis.setTitle.withArgs({ prop: 'Test8888' }).returns('setTitle method mock');

    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.update({ prop: 'Test9876' })).to.equal('update method mock');
    expect(axis.remove({ prop: 'Test1234' })).to.equal('remove method mock');
    expect(axis.addPlotBand({ prop: 'Test4567' })).to.equal('addPlotBand method mock');
    expect(axis.removePlotBand({ prop: 'Test7654' })).to.equal('removePlotBand method mock');
    expect(axis.addPlotLine({ prop: 'Test4444' })).to.equal('addPlotLine method mock');
    expect(axis.removePlotLine({ prop: 'Test5555' })).to.equal('removePlotLine method mock');
    expect(axis.getExtremes({ prop: 'Test6666' })).to.equal('getExtremes method mock');
    expect(axis.setExtremes({ prop: 'Test7777' })).to.equal('setExtremes method mock');
    expect(axis.setTitle({ prop: 'Test8888' })).to.equal('setTitle method mock');
  });

  it('should provide axis functions bound to the axis when calling getAxis', () => {
    testContext.axis.update.withArgs({ prop: 'Test9876' }).returnsThis();
    testContext.axis.remove.withArgs({ prop: 'Test1234' }).returnsThis();
    testContext.axis.addPlotBand.withArgs({ prop: 'Test4567' }).returnsThis();
    testContext.axis.removePlotBand.withArgs({ prop: 'Test7654' }).returnsThis();
    testContext.axis.addPlotLine.withArgs({ prop: 'Test4444' }).returnsThis();
    testContext.axis.removePlotLine.withArgs({ prop: 'Test5555' }).returnsThis();
    testContext.axis.getExtremes.withArgs({ prop: 'Test6666' }).returnsThis();
    testContext.axis.setExtremes.withArgs({ prop: 'Test7777' }).returnsThis();
    testContext.axis.setTitle.withArgs({ prop: 'Test8888' }).returnsThis();

    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.update({ prop: 'Test9876' })).to.equal(testContext.axis);
    expect(axis.remove({ prop: 'Test1234' })).to.equal(testContext.axis);
    expect(axis.addPlotBand({ prop: 'Test4567' })).to.equal(testContext.axis);
    expect(axis.removePlotBand({ prop: 'Test7654' })).to.equal(testContext.axis);
    expect(axis.addPlotLine({ prop: 'Test4444' })).to.equal(testContext.axis);
    expect(axis.removePlotLine({ prop: 'Test5555' })).to.equal(testContext.axis);
    expect(axis.getExtremes({ prop: 'Test6666' })).to.equal(testContext.axis);
    expect(axis.setExtremes({ prop: 'Test7777' })).to.equal(testContext.axis);
    expect(axis.setTitle({ prop: 'Test8888' })).to.equal(testContext.axis);
  });

  it('should provide axis functions which will be cleaned prior to being called', () => {
    const wrapper = mount(
      <Provider value={testContext.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addPlotBand', 'addPlotLine', 'setTitle'];
    wrapper.find(WrappedComponent).props().getAxis();
    expect(testContext.cleanSpy).to.have.callCount(cleanedFunctions.length);
  });
});
