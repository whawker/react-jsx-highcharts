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

  let clock;
  let chart;

  beforeEach(() => {
    testContext = {};

    chart = createMockChart();
    testContext.chartCreationFunc = sinon.stub();
    testContext.chartCreationFunc.returns(chart);
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  describe('when mounted', () => {
    it('should create a Highcharts chart', () => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      clock.tick(1);
      expect(testContext.chartCreationFunc).to.have.been.calledWith(wrapper.getDOMNode());
    });

    it('should create a chart context, with the chart and chart type', done => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0)).to.have.type(Provider);
        expect(wrapper.childAt(0).childAt(0)).to.have.prop('value').deep.equal({ chart, chartType: 'chart' });
        done();
      });
    });

    it('should create a chart context, with the chart and stockChart type', done => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0)).to.have.type(Provider);
        expect(wrapper.childAt(0).childAt(0)).to.have.prop('value').deep.equal({ chart, chartType: 'stockChart' });
        done();
      });
    });

    it('should create a angular chart when mounted with the gauge prop', done => {
      expect(chart.angular).to.not.equal(true);

      const wrapper = mount(<BaseChart gauge chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(chart.angular).to.equal(true);
        done();
      });
    });

    it('should create a polar chart when mounted with the polar prop', done => {
      expect(chart.polar).to.not.equal(true);

      const wrapper = mount(<BaseChart polar chartCreationFunc={testContext.chartCreationFunc} chartType='stockChart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(chart.polar).to.equal(true);
        done();
      });
    });
  });

  describe('update', () => {
    it('should update the chart when the plotOptions change', () => {
      const wrapper = mount(
        <Wrapper chartCreationFunc={testContext.chartCreationFunc} chartType='chart' markersEnabled />
      );
      clock.tick(1);

      wrapper.setProps({ markersEnabled: false })
      expect(chart.update).to.have.been.calledWith({ plotOptions: { series: { marker: { enabled: false } }} });
    });
  });

  describe('when unmounted', () => {
    it('destroys the chart instance', () => {
      const wrapper = mount(<BaseChart chartCreationFunc={testContext.chartCreationFunc} chartType='chart' />);
      clock.tick(1);
      expect(chart.destroy).not.to.have.been.called;
      wrapper.unmount();
      clock.tick(1);
      expect(chart.destroy).to.have.been.called;
    });
  });
});
