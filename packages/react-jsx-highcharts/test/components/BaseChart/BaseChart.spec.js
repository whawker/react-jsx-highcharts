import React, { Component, cloneElement } from 'react';
import BaseChart from '../../../src/components/BaseChart';
import YAxis from '../../../src/components/YAxis';
import { Provider } from '../../../src/components/ChartContext';
import { createMockChart } from '../../test-utils';

class Wrapper extends Component {
  getPlotOptions = enabled => {
    return { series: { marker: { enabled }} }
  }

  render () {
    const { markersEnabled, ...rest } = this.props
    return (
      <BaseChart {...rest} plotOptions={this.getPlotOptions(markersEnabled)} />
    )
  }
}

describe('<BaseChart />', () => {
  let testContext;

  let chart;

  beforeEach(() => {
    testContext = {};

    chart = createMockChart();
    testContext.chartCreationFunc = jest.fn();
    testContext.chartCreationFunc.mockReturnValue(chart);
    jest.useFakeTimers();
  });


  describe('when mounted', () => {
    it('should create a Highcharts chart', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      jest.advanceTimersByTime(1);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.anything());
    });

    it('should create a chart context, with the chart and chart type', done => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0).type()).toEqual(Provider);
        expect(wrapper.childAt(0).childAt(0)).toHaveProp('value',
          { chart, chartType: 'chart', needsRedraw: expect.any(Function) }
        );
        done();
      });
    });

    it('should create a chart context, with the chart and stockChart type', done => {
      const wrapper = mount(<BaseChart {...testContext} chartType='stockChart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0).type()).toEqual(Provider);
        expect(wrapper.childAt(0).childAt(0)).toHaveProp('value',
          { chart, chartType: 'stockChart', needsRedraw: expect.any(Function) }
        );
        done();
      });
    });

    it('should create a angular chart when mounted with the gauge prop', done => {
      expect(chart.angular).toBeFalsy();

      const wrapper = mount(<BaseChart gauge {...testContext} chartType='stockChart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(chart.angular).toEqual(true);
        done();
      });
    });

    it('should create a polar chart when mounted with the polar prop', done => {
      expect(chart.polar).toBeFalsy();

      const wrapper = mount(<BaseChart polar {...testContext} chartType='stockChart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(chart.polar).toBe(true);
        done();
      });
    });
  });

  describe('update', () => {
    it('should update the chart when the plotOptions change', () => {
      const wrapper = mount(
        <Wrapper {...testContext} chartType='chart' markersEnabled />
      );
      jest.advanceTimersByTime(1);

      wrapper.setProps({ markersEnabled: false })

      expect(chart.update).toHaveBeenCalledWith({ plotOptions: { series: { marker: { enabled: false } }} }, false);
    });
  });

  describe('when unmounted', () => {
    it('destroys the chart instance', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      jest.advanceTimersByTime(1);
      expect(chart.destroy).not.toHaveBeenCalled();
      wrapper.unmount();
      jest.advanceTimersByTime(1);
      expect(chart.destroy).toHaveBeenCalled();
    });
  });
});
