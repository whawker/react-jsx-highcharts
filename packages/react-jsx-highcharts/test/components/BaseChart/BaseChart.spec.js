import React, { Component, cloneElement } from 'react';
import BaseChart from '../../../src/components/BaseChart';
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
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      jest.advanceTimersByTime(1);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.anything());
    });

    it('should create a chart context, with the chart and chart type', done => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0).type()).toEqual(Provider);
        expect(wrapper.childAt(0).childAt(0)).toHaveProp('value', { chart, chartType: 'chart' });
        done();
      });
    });

    it('should create a chart context, with the chart and stockChart type', done => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0).type()).toEqual(Provider);
        expect(wrapper.childAt(0).childAt(0)).toHaveProp('value', { chart, chartType: 'stockChart' });
        done();
      });
    });

    it('should create a angular chart when mounted with the gauge prop', done => {
      expect(chart.angular).toBeFalsy();

      const wrapper = mount(<BaseChart gauge chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
      jest.advanceTimersByTime(1);

      wrapper.setState({ rendered: true }, () => {
        expect(chart.angular).toEqual(true);
        done();
      });
    });

    it('should create a polar chart when mounted with the polar prop', done => {
      expect(chart.polar).toBeFalsy();

      const wrapper = mount(<BaseChart polar chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
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
        <Wrapper chartCreationFunc={testContext.chartCreationFunc} chartType='chart' markersEnabled />
      );
      jest.advanceTimersByTime(1);

      wrapper.setProps({ markersEnabled: false })

      expect(chart.update).toHaveBeenCalledWith({ plotOptions: { series: { marker: { enabled: false } }} }, true);
    });
  });

  describe('when unmounted', () => {
    it('destroys the chart instance', () => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      jest.advanceTimersByTime(1);
      expect(chart.destroy).not.toHaveBeenCalled();
      wrapper.unmount();
      jest.advanceTimersByTime(1);
      expect(chart.destroy).toHaveBeenCalled();
    });
  });
});
