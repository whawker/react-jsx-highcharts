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

describe('<AxisProvider />', function () {
  before(function () {
    this.chartProviderStub = sinon.stub(chartProvider, 'default').returnsArg(0);
    this.delayRenderStub = sinon.stub(DelayRender, 'default').callsFake(({ children }) => ( <div>{children}</div> ));
  });

  beforeEach(function () {
    this.cleanSpy = sinon.spy(clean, 'default');
    this.axis = createMockAxis({
      userOptions: { id: 'myAxisId' },
      coll: 'yAxis'
    });

    AxisWrappedComponent = provideAxis(WrappedComponent);
  });

  afterEach(function () {
    this.chartProviderStub.resetHistory();
    this.cleanSpy.restore();
  });

  after(function () {
    this.chartProviderStub.restore();
    this.delayRenderStub.restore();
  });

  it('should not render the wrapped component if there is no axis context', function () {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.not.exist;
  });

  it('should render the wrapped component if there is an axis context', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should render the wrapped component if it does not require an axis, and there is no axis context', function () {
    const wrapper = mount(
      <Provider value={undefined}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should render the wrapped component if it does not require an axis, and there is an axis context', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent requiresAxis={false} />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should additionally wrap the component with the chart context', function () {
    mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(this.chartProviderStub).to.have.been.calledWith(AxisWrappedComponent);
  });

  it('should provide a getAxis prop to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getAxis')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide axis functions when calling getAxis', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.object).to.equal(this.axis);
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

  it('should provide expected axis functions when calling getAxis', function () {
    this.axis.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
    this.axis.remove.withArgs({ prop: 'Test1234' }).returns('remove method mock');
    this.axis.addPlotBand.withArgs({ prop: 'Test4567' }).returns('addPlotBand method mock');
    this.axis.removePlotBand.withArgs({ prop: 'Test7654' }).returns('removePlotBand method mock');
    this.axis.addPlotLine.withArgs({ prop: 'Test4444' }).returns('addPlotLine method mock');
    this.axis.removePlotLine.withArgs({ prop: 'Test5555' }).returns('removePlotLine method mock');
    this.axis.getExtremes.withArgs({ prop: 'Test6666' }).returns('getExtremes method mock');
    this.axis.setExtremes.withArgs({ prop: 'Test7777' }).returns('setExtremes method mock');
    this.axis.setTitle.withArgs({ prop: 'Test8888' }).returns('setTitle method mock');

    const wrapper = mount(
      <Provider value={this.axis}>
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

  it('should provide axis functions bound to the axis when calling getAxis', function () {
    this.axis.update.withArgs({ prop: 'Test9876' }).returnsThis();
    this.axis.remove.withArgs({ prop: 'Test1234' }).returnsThis();
    this.axis.addPlotBand.withArgs({ prop: 'Test4567' }).returnsThis();
    this.axis.removePlotBand.withArgs({ prop: 'Test7654' }).returnsThis();
    this.axis.addPlotLine.withArgs({ prop: 'Test4444' }).returnsThis();
    this.axis.removePlotLine.withArgs({ prop: 'Test5555' }).returnsThis();
    this.axis.getExtremes.withArgs({ prop: 'Test6666' }).returnsThis();
    this.axis.setExtremes.withArgs({ prop: 'Test7777' }).returnsThis();
    this.axis.setTitle.withArgs({ prop: 'Test8888' }).returnsThis();

    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const axis = wrapper.find(WrappedComponent).props().getAxis();
    expect(axis.update({ prop: 'Test9876' })).to.equal(this.axis);
    expect(axis.remove({ prop: 'Test1234' })).to.equal(this.axis);
    expect(axis.addPlotBand({ prop: 'Test4567' })).to.equal(this.axis);
    expect(axis.removePlotBand({ prop: 'Test7654' })).to.equal(this.axis);
    expect(axis.addPlotLine({ prop: 'Test4444' })).to.equal(this.axis);
    expect(axis.removePlotLine({ prop: 'Test5555' })).to.equal(this.axis);
    expect(axis.getExtremes({ prop: 'Test6666' })).to.equal(this.axis);
    expect(axis.setExtremes({ prop: 'Test7777' })).to.equal(this.axis);
    expect(axis.setTitle({ prop: 'Test8888' })).to.equal(this.axis);
  });

  it('should provide axis functions which will be cleaned prior to being called', function () {
    const wrapper = mount(
      <Provider value={this.axis}>
        <AxisWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update', 'addPlotBand', 'addPlotLine', 'setTitle'];
    wrapper.find(WrappedComponent).props().getAxis();
    expect(this.cleanSpy).to.have.callCount(cleanedFunctions.length);
  });
});
