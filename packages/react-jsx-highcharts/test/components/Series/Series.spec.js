import React from 'react';
import { List } from 'immutable';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis, createMockSeries, uuidRegex } from '../../test-utils';
import Series from '../../../src/components/Series/Series';

describe('<Series />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = axisStubs;
    testContext.seriesStubs = createMockSeries();
    testContext.chartStubs.addSeries.mockReturnValue(testContext.seriesStubs);
    testContext.needsRedraw = needsRedraw;

    testContext.propsFromProviders = {
      getChart,
      getAxis,
      needsRedraw,
      getHighcharts: () => Highcharts
    };
  });


  describe('when mounted', () => {
    it('adds an X series using the addSeries method', () => {
      testContext.axisStubs.id = 'myXAxisId';
      testContext.axisStubs.type = 'xAxis';

      mount(
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'mySeries', xAxis: 'myXAxisId', type: 'line', data: [], visible: true }, true
      ), false);
    });

    it('adds a Y series using the addSeries method', () => {
      testContext.axisStubs.id = 'myYAxisId';
      testContext.axisStubs.type = 'yAxis';

      mount(
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'mySeries', yAxis: 'myYAxisId', type: 'line', data: [], visible: true }, true
      ), false);
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <Series id="mySeriesIdStr" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual('mySeriesIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'mySeriesIdFromFunc'
      mount(
        <Series id={idFunc} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toEqual('mySeriesIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <Series {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.mock.calls[0][0].id).toMatch(uuidRegex);
    });

    it('should pass additional props through to Highcharts addSeries method', () => {
      mount(
        <Series id="mySeries" data={[5]} step {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining({
        id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true
      }), false);
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleClick = jest.fn();
      const handleShow = jest.fn();

      mount(
        <Series id="mySeries" onClick={handleClick} onShow={handleShow}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.seriesStubs.update).toHaveBeenCalledWith({
        events: {
          click: handleClick,
          show: handleShow
        }
      }, false);
    });

    it('supports mounting with Immutable List data', () => {
      const data = [1, 2, 3, 4, 5];
      mount(
        <Series id="mySeries" data={List(data)} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data, visible: true }
      ), false);
    });
  });

  describe('update', () => {
    it('should use the setData method on the correct series when the data changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.mockReset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith([1, 2, 3], false);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
    });

    it('should NOT use the setData method if the data hasn\'t changed', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[1, 2, 3]} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.mockReset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
    });

    it('should use the setData method on the correct series when the Immutable List changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...testContext.propsFromProviders} />
      );
      const newData = [1, 2, 3, 4, 5];
      testContext.seriesStubs.update.mockReset();
      wrapper.setProps({ data: List(newData) });
      expect(testContext.seriesStubs.setData).toHaveBeenCalledWith(newData, false);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
    });

    it('should NOT use the setData method if the Immutable List hasn\'t changed', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.mockReset();
      wrapper.setProps({ data: List([1, 2, 3]) });
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
    });

    it('should use the setVisible method on the correct series when the visibility changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.mockReset();
      wrapper.setProps({ visible: false });
      expect(testContext.seriesStubs.setVisible).toHaveBeenCalledWith(false, false);
      expect(testContext.seriesStubs.update).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
    });

    it('should use the update method on correct series if arbritary props change', () => {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(testContext.seriesStubs.update).toHaveBeenCalledWith({
        newPropName: 'newPropValue'
      }, false);
      expect(testContext.seriesStubs.setData).not.toHaveBeenCalled();
      expect(testContext.seriesStubs.setVisible).not.toHaveBeenCalled();
    });

    it('should use the most performant method available even when multiple props change', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} visible={false} {...testContext.propsFromProviders} />
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
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      wrapper.unmount();
      expect(testContext.seriesStubs.remove).toHaveBeenCalled();
    });
  });
});
