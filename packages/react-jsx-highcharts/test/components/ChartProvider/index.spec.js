import React, { Component } from 'react';
import { createMockChart } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';
import { Provider } from '../../../src/components/ChartContext';
import provideChart from '../../../src/components/ChartProvider';
import HighchartsContext from '../../../src/components/HighchartsContext';

const WrappedComponent = props => (
  <div />
);
let ChartWrappedComponent;

describe('<ChartProvider />', () => {
  let testContext;

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
      <Provider value={{ getChart: () => null }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should additionally provide the component with getHighcharts', () => {
    const getHighcharts = jest.fn();
    const wrapper = mount(
      <HighchartsContext.Provider value={getHighcharts}>
        <Provider value={{ getChart: () => null }}>
          <ChartWrappedComponent />
        </Provider>
      </HighchartsContext.Provider>
    );
    expect(wrapper.find(WrappedComponent).prop('getHighcharts')).toEqual(getHighcharts);
  });

  it('should provide a getChart prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ getChart: () => null }}>
        <ChartWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).toEqual(expect.any(Function));
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={{ getChart: () => null }}>
        <ChartWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getChart')).toEqual(expect.any(Function));
    expect(wrapper.find(WrappedComponent).prop('someProp')).toEqual('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).toEqual('otherValue');
  });
});
