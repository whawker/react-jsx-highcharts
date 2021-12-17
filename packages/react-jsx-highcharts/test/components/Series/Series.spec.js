import * as React from 'react';
import { render } from '@testing-library/react';

import {
  Highcharts,
  createMockProvidedChart,
  createMockProvidedAxis,
  createMockSeries,
  uuidRegex
} from '../../test-utils';
import Series from '../../../src/components/Series/Series';
import HighchartsContext from '../../../src/components/HighchartsContext';
import ChartContext from '../../../src/components/ChartContext';
import * as useAxis from '../../../src/components/UseAxis';

describe('<Series />', () => {
  let testContext;
  let ProvidedSeries;
  let useAxisSpy;
  beforeEach(() => {
    testContext = {};

    const { chartStubs, needsRedraw } = createMockProvidedChart();
    const { providedAxis } = createMockProvidedAxis({
      id: 'myAxis',
      type: 'yAxis'
    });
    useAxisSpy = jest
      .spyOn(useAxis, 'default')
      .mockImplementation(() => providedAxis);

    testContext.chartStubs = chartStubs;
    testContext.providedAxis = providedAxis;
    testContext.seriesStubs = createMockSeries();
    testContext.chartStubs.addSeries.mockReturnValue(testContext.seriesStubs);
    testContext.needsRedraw = needsRedraw;

    testContext.propsFromProviders = {
      axis: providedAxis
    };

    const highchartsValue = () => Highcharts;

    ProvidedSeries = props => (
      <HighchartsContext.Provider value={highchartsValue}>
        <ChartContext.Provider value={chartStubs}>
          <Series {...props} />
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    );
  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });

  describe('when mounted', () => {
    it('adds an X series using the addSeries method', () => {
      testContext.providedAxis.id = 'myXAxisId';
      testContext.providedAxis.type = 'xAxis';

      render(<ProvidedSeries id="mySeries" />);
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
        {
          id: 'mySeries',
          xAxis: 'myXAxisId',
          type: 'line',
          data: [],
          visible: true,
          events: {}
        },
        false
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
    });

    it('adds a Y series using the addSeries method', () => {
      testContext.providedAxis.id = 'myYAxisId';
      testContext.providedAxis.type = 'yAxis';

      render(<ProvidedSeries id="mySeries" />);
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
        {
          id: 'mySeries',
          yAxis: 'myYAxisId',
          type: 'line',
          data: [],
          visible: true,
          events: {}
        },
        false
      );
    });

    it('uses the provided ID if id prop is a string', () => {
      render(<ProvidedSeries id="mySeriesIdStr" />);
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual(
        'mySeriesIdStr'
      );
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'mySeriesIdFromFunc';
      render(<ProvidedSeries id={idFunc} />);
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual(
        'mySeriesIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      render(<ProvidedSeries />);
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toMatch(
        uuidRegex
      );
    });

    it('should pass additional props through to Highcharts addSeries method', () => {
      render(<ProvidedSeries id="mySeries" data={[5]} step />);
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
        {
          id: 'mySeries',
          yAxis: 'myAxis',
          type: 'line',
          data: [5],
          visible: true,
          step: true,
          events: {}
        },
        false
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleClick = jest.fn();
      const handleShow = jest.fn();

      render(
        <ProvidedSeries
          id="mySeries"
          onClick={handleClick}
          onShow={handleShow}
        />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(
        expect.objectContaining({
          events: {
            click: handleClick,
            show: handleShow
          }
        }),
        false
      );
    });

    it('throws Error when requiresAxis=true and mounted without axis', () => {
      testContext.propsFromProviders.axis = null;
      //disable console to prevent stacktrace print
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(c => c);

      expect(() => {
        render(<Series id="mySeries" requiresAxis={true} />);
      }).toThrow();

      consoleSpy.mockRestore();
    });

    it('does not throw Error when requiresAxis=false and mounted without axis', () => {
      testContext.propsFromProviders.axis = null;
      expect(() => {
        render(<ProvidedSeries id="mySeries" requiresAxis={false} />);
      }).not.toThrow();
    });
  });

  describe('update', () => {
    const resetMocks = () => {
      testContext.seriesStubs.update.mockReset();
      testContext.seriesStubs.setData.mockReset();
      testContext.seriesStubs.setVisible.mockReset();
      testContext.needsRedraw.mockReset();
    };

    it('should use the setData method on the correct series when the data changes', () => {
      const wrapper = render(<ProvidedSeries id="mySeries" data={[]} />);
      resetMocks();
      wrapper.rerender(<ProvidedSeries id="mySeries" data={[1, 2, 3]} />);

      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(
        [1, 2, 3],
        false,
        undefined,
        undefined
      );
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();

      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it("should NOT use the setData method if the data reference hasn't changed", () => {
      const data = [1, 2, 3];
      const wrapper = render(<ProvidedSeries id="mySeries" data={data} />);
      resetMocks();
      wrapper.rerender(<ProvidedSeries id="mySeries" data={data} />);

      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).not.toHaveBeenCalled();
    });

    it('should use the setData method if the data reference has changed', () => {
      const wrapper = render(<ProvidedSeries id="mySeries" data={[1, 2, 3]} />);
      resetMocks();
      wrapper.rerender(<ProvidedSeries id="mySeries" data={[1, 2, 3]} />);

      expect(testContext.seriesStubs.setData).toHaveBeenCalled();
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalled();
    });

    it('should use the isDataEqual prop to compare data', () => {
      const isDataEqual = jest.fn(() => false);
      const wrapper = render(
        <ProvidedSeries
          id="mySeries"
          data={[1, 2, 3]}
          isDataEqual={isDataEqual}
        />
      );

      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[4, 5, 6]}
          isDataEqual={isDataEqual}
        />
      );

      expect(isDataEqual).toHaveBeenCalledWith([4, 5, 6], [1, 2, 3]);
    });

    it('should NOT setData if isDataEqual returns true', () => {
      const isDataEqual = jest.fn(() => true);
      const wrapper = render(
        <ProvidedSeries
          id="mySeries"
          data={[1, 2, 3]}
          isDataEqual={isDataEqual}
        />
      );
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[4, 5, 6]}
          isDataEqual={isDataEqual}
        />
      );

      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
    });

    it('should setData if isDataEqual returns false', () => {
      const isDataEqual = jest.fn(() => false);
      const wrapper = render(
        <ProvidedSeries
          id="mySeries"
          data={[1, 2, 3]}
          isDataEqual={isDataEqual}
        />
      );
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[4, 5, 6]}
          isDataEqual={isDataEqual}
        />
      );

      expect(testContext.seriesStubs.setData).toHaveBeenCalled();
    });

    it('should use the setVisible method on the correct series when the visibility changes', () => {
      const wrapper = render(<ProvidedSeries id="mySeries" visible />);
      resetMocks();
      wrapper.rerender(<ProvidedSeries id="mySeries" visible={false} />);

      expect(testContext.seriesStubs.setVisible).toHaveBeenCalledWith(
        false,
        false
      );
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should use the update method on correct series if arbritary props change', () => {
      const wrapper = render(<ProvidedSeries id="mySeries" visible />);
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries id="mySeries" visible newPropName={'newPropValue'} />
      );

      expect(testContext.seriesStubs.update).toHaveBeenCalledWith(
        {
          newPropName: 'newPropValue'
        },
        false
      );
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should use the most performant method available even when multiple props change', () => {
      const wrapper = render(
        <ProvidedSeries id="mySeries" data={[]} visible={false} />
      );
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[4, 5, 6]}
          visible={true}
          opposite={true}
        />
      );

      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(
        [4, 5, 6],
        false,
        undefined,
        undefined
      );
      expect(testContext.seriesStubs.setVisible).toHaveBeenCalledWith(
        true,
        false
      );
      expect(testContext.seriesStubs.update).toHaveBeenCalledWith(
        {
          opposite: true
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should propagate updatePoints when calling setData', () => {
      const wrapper = render(
        <ProvidedSeries
          id="mySeries"
          data={[]}
          jsxOptions={{ updatePoints: false }}
        />
      );
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[1, 2, 3]}
          jsxOptions={{ updatePoints: false }}
        />
      );

      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(
        [1, 2, 3],
        false,
        undefined,
        false
      );
    });

    it('should propagate animation when calling setData', () => {
      const wrapper = render(
        <ProvidedSeries
          id="mySeries"
          data={[]}
          jsxOptions={{ animation: false }}
        />
      );
      resetMocks();
      wrapper.rerender(
        <ProvidedSeries
          id="mySeries"
          data={[1, 2, 3]}
          jsxOptions={{ animation: false }}
        />
      );

      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(
        [1, 2, 3],
        false,
        false,
        undefined
      );
    });
  });

  describe('when unmounted', () => {
    it('removes the correct series (if the series still exists)', () => {
      const wrapper = render(<ProvidedSeries id="mySeries" />);
      testContext.needsRedraw.mockClear();
      wrapper.unmount();
      expect(testContext.seriesStubs.remove).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });
});
