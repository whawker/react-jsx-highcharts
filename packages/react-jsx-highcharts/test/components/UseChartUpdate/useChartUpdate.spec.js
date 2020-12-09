import * as React from 'react';
import { render } from '@testing-library/react';

import useChartUpdate from '../../../src/components/UseChartUpdate';
import ChartContext from '../../../src/components/ChartContext';
import { createMockProvidedChart } from '../../test-utils';

describe('useChartUpdate', () => {
  let ProvidedChartComponent;
  let ChildComponent;
  let testChart;
  let updateFn;
  let destroyFn;

  beforeEach(() => {
    const { chartStubs } = createMockProvidedChart();
    testChart = chartStubs;
    updateFn = jest.fn();
    destroyFn = jest.fn();

    ChildComponent = props => {
      useChartUpdate(props, updateFn, destroyFn, false);
      return null;
    };

    ProvidedChartComponent = props => (
      <ChartContext.Provider value={testChart}>
        <ChildComponent {...props}>testtext</ChildComponent>
      </ChartContext.Provider>
    );
  });

  it('should call update function on mount', () => {
    const wrapper = render(<ProvidedChartComponent firstProp="first" />);

    expect(updateFn).toHaveBeenCalledWith(testChart, { firstProp: 'first' });
    expect(destroyFn).not.toHaveBeenCalled();
  });

  it('should call update function with modifiedProps', () => {
    const wrapper = render(<ProvidedChartComponent firstProp="first" />);
    updateFn.mockClear();
    wrapper.rerender(
      <ProvidedChartComponent firstProp="first2" secondProp="second" />
    );

    expect(updateFn).toHaveBeenCalledWith(testChart, {
      firstProp: 'first2',
      secondProp: 'second'
    });
    expect(destroyFn).not.toHaveBeenCalled();
  });

  it("should not call update function when props don't change", () => {
    const wrapper = render(<ProvidedChartComponent firstProp="first" />);

    updateFn.mockClear();
    wrapper.rerender(<ProvidedChartComponent firstProp="first" />);

    expect(updateFn).not.toHaveBeenCalled();
  });

  it('should call destroy function on unmount', () => {
    const wrapper = render(<ProvidedChartComponent firstProp="first" />);

    updateFn.mockClear();
    wrapper.unmount();

    expect(destroyFn).toHaveBeenCalledWith(testChart);
    expect(updateFn).not.toHaveBeenCalled();
  });
});
