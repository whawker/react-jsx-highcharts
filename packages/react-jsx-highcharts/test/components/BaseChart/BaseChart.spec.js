import React, { Component, cloneElement } from 'react';
import BaseChart from '../../../src/components/BaseChart';
import { Consumer } from '../../../src/components/ChartContext';
import { createMockChart } from '../../test-utils';
import * as clean from '../../../src/utils/removeProvidedProps';

class Wrapper extends Component {
  getPlotOptions = enabled => {
    return { series: { marker: { enabled }} };
  }

  render () {
    const { markersEnabled, ...rest } = this.props;
    return (
      <BaseChart {...rest} plotOptions={this.getPlotOptions(markersEnabled)} />
    )
  }
}

const ChildComponent = ({ value }) => (
  <div/>
)

describe('<BaseChart />', () => {
  let testContext;
  let chart;
  let cleanSpy;

  beforeEach(() => {
    testContext = {};

    chart = createMockChart();
    testContext.chartCreationFunc = jest.fn();
    testContext.chartCreationFunc.mockReturnValue(chart);
    cleanSpy = jest.spyOn(clean, 'default');

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
    cleanSpy.mockClear();
    chart.get.mockReset();
    chart.setSize.mockReset();
    chart.update.mockReset();
    chart.addAxis.mockReset();
    chart.addSeries.mockReset();
    chart.setTitle.mockReset();
    chart.showLoading.mockReset();
    chart.hideLoading.mockReset();
    chart.addCredits.mockReset();
  });

  describe('when mounted', () => {
    it('should create a Highcharts chart', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.anything());
    });

    it('should create a chart context, with the chart and chart type', done => {

      const wrapper = mount(
        <BaseChart {...testContext} chartType='chart'>
          <Consumer>
            { value => (
              <ChildComponent value={ value } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const child = wrapper.find(ChildComponent);
        expect(child).toHaveProp('value',
          { chart, chartType: 'chart', getChart: expect.any(Function),
           needsRedraw: expect.any(Function)
          }
        );
        done();
      });
    });

    it('should create a chart context, with the chart and stockChart type', done => {
      const ChildComponent = ({ value }) => (
        <div>{ value.chartType }</div>
      )
      const wrapper = mount(
        <BaseChart {...testContext} chartType='stockChart'>
          <Consumer>
            { value => (
              <ChildComponent value={ value } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const child = wrapper.find(ChildComponent);
        expect(child).toHaveProp('value',
          { chart, chartType: 'stockChart', getChart: expect.any(Function),
            needsRedraw: expect.any(Function)
          }
        );
        done();
      });
    });

    it('should create a angular chart when mounted with the gauge prop', done => {
      expect(chart.angular).toBeFalsy();

      const wrapper = mount(<BaseChart gauge {...testContext} chartType='stockChart' />);
      wrapper.setState({ rendered: true }, () => {
        expect(chart.angular).toEqual(true);
        done();
      });
    });

    it('should create a polar chart when mounted with the polar prop', done => {
      expect(chart.polar).toBeFalsy();

      const wrapper = mount(<BaseChart polar {...testContext} chartType='stockChart' />);
      wrapper.setState({ rendered: true }, () => {
        expect(chart.polar).toBe(true);
        done();
      });
    });

    it('should create a chart with styledMode=false by default', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.objectContaining({ chart: { styledMode: false } }));
    });

    it('should create a chart with styledMode=true if the styledMode prop is passed', () => {
      const wrapper = mount(<BaseChart {...testContext} styledMode chartType='chart' />);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.objectContaining({ chart: { styledMode: true } }));
    });

    it('should provide chart functions when calling getChart', done => {
      const wrapper = mount(
        <BaseChart {...testContext} chartType='chart'>
          <Consumer>
            { ({ getChart }) => (
              <ChildComponent getChart={ getChart } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const chartProp = wrapper.find(ChildComponent).props().getChart();
        expect(chartProp.type).toEqual('chart');
        expect(chartProp.get).toEqual(expect.any(Function));
        expect(chartProp.setSize).toEqual(expect.any(Function));
        expect(chartProp.update).toEqual(expect.any(Function));
        expect(chartProp.addAxis).toEqual(expect.any(Function));
        expect(chartProp.addSeries).toEqual(expect.any(Function));
        expect(chartProp.setTitle).toEqual(expect.any(Function));
        expect(chartProp.setCaption).toEqual(expect.any(Function));
        expect(chartProp.showLoading).toEqual(expect.any(Function));
        expect(chartProp.hideLoading).toEqual(expect.any(Function));
        expect(chartProp.addCredits).toEqual(expect.any(Function));
        done();
      });
    });

    it('should provide expected chart functions when calling getChart', done => {
      chart.get.mockReturnValueOnce('get method mock');
      chart.setSize.mockReturnValueOnce('setSize method mock');
      chart.update.mockReturnValueOnce('update method mock');
      chart.addAxis.mockReturnValueOnce('addAxis method mock');
      chart.addSeries.mockReturnValueOnce('addSeries method mock');
      chart.setTitle.mockReturnValueOnce('setTitle method mock');
      chart.setCaption.mockReturnValueOnce('setCaption method mock');
      chart.showLoading.mockReturnValueOnce('showLoading method mock');
      chart.hideLoading.mockReturnValueOnce('hideLoading method mock');
      chart.addCredits.mockReturnValueOnce('addCredits method mock');

      const wrapper = mount(
        <BaseChart {...testContext} chartType='chart'>
          <Consumer>
            { ({ getChart }) => (
              <ChildComponent getChart={ getChart } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const chartProp = wrapper.find(ChildComponent).props().getChart();
        expect(chartProp.type).toEqual('chart');
        expect(chartProp.get({ prop: 'Test1234' })).toEqual('get method mock');
        expect(chartProp.setSize({ prop: 'Test5678' })).toEqual('setSize method mock');
        expect(chartProp.update({ prop: 'Test9876' })).toEqual('update method mock');
        expect(chartProp.addAxis({ prop: 'Test4567' })).toEqual('addAxis method mock');
        expect(chartProp.addSeries({ prop: 'Test7654' })).toEqual('addSeries method mock');
        expect(chartProp.setTitle({ prop: 'Test8080' })).toEqual('setTitle method mock');
        expect(chartProp.setCaption({ prop: 'Test8080' })).toEqual('setCaption method mock');
        expect(chartProp.showLoading({ prop: 'Test1111' })).toEqual('showLoading method mock');
        expect(chartProp.hideLoading({ prop: 'Test2222' })).toEqual('hideLoading method mock');
        expect(chartProp.addCredits({ prop: 'Test3333' })).toEqual('addCredits method mock');
        done();
      });
    });

    it('should provide chart functions bound to the chart when calling getChart', done => {
      chart.get.mockReturnThis();
      chart.setSize.mockReturnThis();
      chart.update.mockReturnThis();
      chart.addAxis.mockReturnThis();
      chart.addSeries.mockReturnThis();
      chart.setTitle.mockReturnThis();
      chart.setCaption.mockReturnThis();
      chart.showLoading.mockReturnThis();
      chart.hideLoading.mockReturnThis();
      chart.addCredits.mockReturnThis();

      const wrapper = mount(
        <BaseChart {...testContext} chartType='stockChart'>
          <Consumer>
            { ({ getChart }) => (
              <ChildComponent getChart={ getChart } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const chartProp = wrapper.find(ChildComponent).props().getChart();
        expect(chartProp.type).toEqual('stockChart');
        expect(chartProp.get({ prop: 'Test1234' })).toEqual(chart);
        expect(chartProp.setSize({ prop: 'Test5678' })).toEqual(chart);
        expect(chartProp.update({ prop: 'Test9876' })).toEqual(chart);
        expect(chartProp.addAxis({ prop: 'Test4567' })).toEqual(chart);
        expect(chartProp.addSeries({ prop: 'Test7654' })).toEqual(chart);
        expect(chartProp.setTitle({ prop: 'Test8080' })).toEqual(chart);
        expect(chartProp.setCaption({ prop: 'Test8080' })).toEqual(chart);
        expect(chartProp.showLoading({ prop: 'Test1111' })).toEqual(chart);
        expect(chartProp.hideLoading({ prop: 'Test2222' })).toEqual(chart);
        expect(chartProp.addCredits({ prop: 'Test3333' })).toEqual(chart);
        done();
      });
    });

    it('should provide chart functions which will be cleaned prior to being called', done => {
      const wrapper = mount(
        <BaseChart {...testContext} chartType='chart'>
          <Consumer>
            { ({ getChart }) => (
              <ChildComponent getChart={ getChart } />
            )}
          </Consumer>
        </BaseChart>
      );

      wrapper.setState({ rendered: true }, () => {
        const child = wrapper.find(ChildComponent).props().getChart();
        const cleanedFunctions = ['update', 'addAxis', 'addSeries', 'setTitle', 'addCredits', 'setCaption'];
        expect(cleanSpy).toHaveBeenCalledTimes(cleanedFunctions.length);
        done();
      });
    });
  });

  describe('update', () => {
    it('should update the chart when the plotOptions change', () => {
      const wrapper = mount(
        <Wrapper {...testContext} chartType='chart' markersEnabled />
      );
      wrapper.setProps({ markersEnabled: false });

      expect(chart.update).toHaveBeenCalledWith({ plotOptions: { series: { marker: { enabled: false } }} }, false);
    });
  });

  describe('when unmounted', () => {
    it('destroys the chart instance', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      expect(chart.destroy).not.toHaveBeenCalled();

      wrapper.unmount();
      expect(chart.destroy).toHaveBeenCalled();
    });
  });
});
