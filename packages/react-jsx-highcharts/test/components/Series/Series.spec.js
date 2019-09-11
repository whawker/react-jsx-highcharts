import React from 'react';
import { List as List4 } from 'immutable';
import { List as List3 } from 'immutable3';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis, createMockSeries, uuidRegex } from '../../test-utils';
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
    const { providedAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    useAxisSpy = jest.spyOn(useAxis, 'default').mockImplementation(() => providedAxis);

    testContext.chartStubs = chartStubs;
    testContext.providedAxis = providedAxis;
    testContext.seriesStubs = createMockSeries();
    testContext.chartStubs.addSeries.mockReturnValue(testContext.seriesStubs);
    testContext.needsRedraw = needsRedraw;

    testContext.propsFromProviders = {
      axis: providedAxis,
    };
    ProvidedSeries = props => (
      <HighchartsContext.Provider value = { () => Highcharts }>
        <ChartContext.Provider value = { chartStubs }>
          <Series {...props} />
        </ChartContext.Provider>
      </HighchartsContext.Provider>
    )
  });

  afterEach(() => {
    useAxisSpy.mockRestore();
  });


  describe('when mounted', () => {
    it('adds an X series using the addSeries method', () => {
      testContext.providedAxis.id = 'myXAxisId';
      testContext.providedAxis.type = 'xAxis';

      mount(
        <ProvidedSeries id="mySeries" />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'mySeries', xAxis: 'myXAxisId', type: 'line', data: [], visible: true }, true
      ), false);
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('adds a Y series using the addSeries method', () => {
      testContext.providedAxis.id = 'myYAxisId';
      testContext.providedAxis.type = 'yAxis';

      mount(
        <ProvidedSeries id="mySeries" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'mySeries', yAxis: 'myYAxisId', type: 'line', data: [], visible: true }, true
      ), false);
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <ProvidedSeries id="mySeriesIdStr" />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual('mySeriesIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'mySeriesIdFromFunc'
      mount(
        <ProvidedSeries id={idFunc} />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual('mySeriesIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <ProvidedSeries />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toMatch(uuidRegex);
    });

    it('should pass additional props through to Highcharts addSeries method', () => {
      mount(
        <ProvidedSeries id="mySeries" data={[5]} step />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining({
        id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true
      }), false);
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleClick = jest.fn();
      const handleShow = jest.fn();

      mount(
        <ProvidedSeries id="mySeries" onClick={handleClick} onShow={handleShow}
          />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining({
        events: {
          click: handleClick,
          show: handleShow
        }
      }), false);
    });

    [List3, List4].forEach((List) => {
      it('supports mounting with Immutable List data', () => {
        const data = [1, 2, 3, 4, 5];
        mount(
          <ProvidedSeries id="mySeries" data={List(data)} />
        );
        expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
          { id: 'mySeries', yAxis: 'myAxis', type: 'line', data, visible: true }
        ), false);
        // test immutable 3
        testContext.chartStubs.addSeries.mockClear();
      });
    });

    it('throws Error when requiresAxis=true and mounted without axis', () => {
      testContext.propsFromProviders.axis = null;

      expect(() => {
        shallow(
          <Series id="mySeries" requiresAxis={true} />
        );
      }).toThrow();
    });

    it('does not throw Error when requiresAxis=false and mounted without axis', () => {
      testContext.propsFromProviders.axis =  null;
      expect(() => {
        mount(
          <ProvidedSeries id="mySeries" requiresAxis={false} />
        );
      }).not.toThrow();
    });
  });

  describe('update', () => {
    it('should use the setData method on the correct series when the data changes', () => {
      const wrapper = mount(
        <ProvidedSeries
          id="mySeries" data={[]} />
      );
      testContext.seriesStubs.update.mockReset();
      testContext.needsRedraw.mockClear();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith([1, 2, 3], false);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();

      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should NOT use the setData method if the data hasn\'t changed', () => {
      const wrapper = mount(
        <ProvidedSeries
          id="mySeries" data={[1, 2, 3]} />
      );
      testContext.seriesStubs.update.mockReset();
      testContext.needsRedraw.mockClear();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).not.toHaveBeenCalled();
    });
    [List3, List4].forEach((List) => {
      it('should use the setData method on the correct series when the Immutable List changes', () => {
        const wrapper = mount(
          <ProvidedSeries
            id="mySeries" data={List([1, 2, 3])} />
        );
        const newData = [1, 2, 3, 4, 5];
        testContext.seriesStubs.update.mockReset();
        wrapper.setProps({ data: List(newData) });
        expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(newData, false);
        expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
        expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      });
    });
    [List3, List4].forEach((List) => {
      it('should NOT use the setData method if the Immutable List hasn\'t changed', () => {
        const wrapper = mount(
          <ProvidedSeries
            id="mySeries" data={List([1, 2, 3])} />
        );
        testContext.seriesStubs.update.mockReset();
        testContext.needsRedraw.mockClear();

        wrapper.setProps({ data: List([1, 2, 3]) });
        expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
        expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
        expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
        expect(testContext.needsRedraw).not.toHaveBeenCalled();
      });
  });

    it('should use the setVisible method on the correct series when the visibility changes', () => {
      const wrapper = mount(
        <ProvidedSeries
          id="mySeries" visible />
      );
      testContext.seriesStubs.update.mockReset();
      testContext.needsRedraw.mockClear();
      wrapper.setProps({ visible: false });
      expect(testContext.seriesStubs.setVisible).toHaveBeenCalledWith(false, false);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should use the update method on correct series if arbritary props change', () => {
      const wrapper = mount(
        <ProvidedSeries
          id="mySeries" visible />
      );
      testContext.needsRedraw.mockClear();
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(testContext.seriesStubs.update).toHaveBeenCalledWith({
        newPropName: 'newPropValue'
      }, false);
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should use the most performant method available even when multiple props change', () => {
      const wrapper = mount(
        <ProvidedSeries
          id="mySeries" data={[]} visible={false} />
      );
      testContext.needsRedraw.mockClear();
      wrapper.setProps({ opposite: true, data: [4, 5, 6], visible: true });
      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith([4, 5, 6], false);
      expect(testContext.seriesStubs.setVisible).toHaveBeenCalledWith(true, false);
      expect(testContext.seriesStubs.update).toHaveBeenCalledWith({
        opposite: true
      }, false);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('when unmounted', () => {
    it('removes the correct series (if the series still exists)', () => {
      const wrapper = mount(
        <ProvidedSeries id="mySeries" />
      );
      testContext.needsRedraw.mockClear();
      wrapper.unmount();
      expect(testContext.seriesStubs.remove).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });
});
