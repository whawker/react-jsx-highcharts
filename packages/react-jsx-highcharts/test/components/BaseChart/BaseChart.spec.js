import React, { Component, cloneElement } from 'react';
import BaseChart from '../../../src/components/BaseChart';
import { Consumer } from '../../../src/components/ChartContext';
import { createMockChart } from '../../test-utils';

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

describe('<BaseChart />', () => {
  let testContext;
  let chart;

  beforeEach(() => {
    testContext = {};

    chart = createMockChart();
    testContext.chartCreationFunc = jest.fn();
    testContext.chartCreationFunc.mockReturnValue(chart);

    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  describe('when mounted', () => {
    it('should create a Highcharts chart', () => {
      const wrapper = mount(<BaseChart {...testContext} chartType='chart' />);
      expect(testContext.chartCreationFunc).toHaveBeenCalledWith(wrapper.getDOMNode(), expect.anything());
    });

    it('should create a chart context, with the chart and chart type', done => {
      const ChildComponent = ({ value }) => (
        <div/>
      )
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
          { chart, chartType: 'chart', needsRedraw: expect.any(Function) }
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
          { chart, chartType: 'stockChart', needsRedraw: expect.any(Function) }
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
