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

describe('<SeriesProvider />', function () {
  before(function () {
    this.axisProviderStub = sinon.stub(axisProvider, 'default').returnsArg(0);
    this.delayRenderStub = sinon.stub(DelayRender, 'default').callsFake(({ children }) => ( <div>{children}</div> ));
  });

  beforeEach(function () {
    this.cleanSpy = sinon.spy(clean, 'default');
    this.series = createMockSeries({
      userOptions: { id: 'mySeriesId' },
      type: 'areaspline'
    });

    SeriesWrappedComponent = provideSeries(WrappedComponent);
  });

  afterEach(function () {
    this.axisProviderStub.resetHistory();
    this.cleanSpy.restore();
  });

  after(function () {
    this.axisProviderStub.restore();
    this.delayRenderStub.restore();
  });

  it('should not render the wrapped component if there is no series context', function () {
    const wrapper = mount(
      <Provider value={undefined}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.not.exist;
  });

  it('should render the wrapped component if there is an series context', function () {
    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should additionally wrap the component with the axis context', function () {
    mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(this.axisProviderStub).to.have.been.calledWith(SeriesWrappedComponent);
  });

  it('should provide a getSeries prop to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getSeries')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getSeries')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide series functions when calling getSeries', function () {
    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.object).to.equal(this.series);
    expect(series.id).to.equal('mySeriesId');
    expect(series.type).to.equal('areaspline');
    expect(series.update).to.be.a('function');
    expect(series.remove).to.be.a('function');
    expect(series.setData).to.be.a('function');
    expect(series.setVisible).to.be.a('function');
  });

  it('should provide expected series functions when calling getSeries', function () {
    this.series.update.withArgs({ prop: 'Test9876' }).returns('update method mock');
    this.series.remove.withArgs({ prop: 'Test1234' }).returns('remove method mock');
    this.series.setData.withArgs({ prop: 'Test4567' }).returns('setData method mock');
    this.series.setVisible.withArgs({ prop: 'Test7654' }).returns('setVisible method mock');

    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.update({ prop: 'Test9876' })).to.equal('update method mock');
    expect(series.remove({ prop: 'Test1234' })).to.equal('remove method mock');
    expect(series.setData({ prop: 'Test4567' })).to.equal('setData method mock');
    expect(series.setVisible({ prop: 'Test7654' })).to.equal('setVisible method mock');
  });

  it('should provide series functions bound to the series when calling getSeries', function () {
    this.series.update.withArgs({ prop: 'Test9876' }).returnsThis();
    this.series.remove.withArgs({ prop: 'Test1234' }).returnsThis();
    this.series.setData.withArgs({ prop: 'Test4567' }).returnsThis();
    this.series.setVisible.withArgs({ prop: 'Test7654' }).returnsThis();

    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const series = wrapper.find(WrappedComponent).props().getSeries();
    expect(series.update({ prop: 'Test9876' })).to.equal(this.series);
    expect(series.remove({ prop: 'Test1234' })).to.equal(this.series);
    expect(series.setData({ prop: 'Test4567' })).to.equal(this.series);
    expect(series.setVisible({ prop: 'Test7654' })).to.equal(this.series);
  });

  it('should provide series functions which will be cleaned prior to being called', function () {
    const wrapper = mount(
      <Provider value={this.series}>
        <SeriesWrappedComponent />
      </Provider>
    );

    const cleanedFunctions = ['update'];
    wrapper.find(WrappedComponent).props().getSeries();
    expect(this.cleanSpy).to.have.callCount(cleanedFunctions.length);
  });
});
