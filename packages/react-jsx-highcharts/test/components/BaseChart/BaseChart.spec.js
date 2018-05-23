import React, { Component } from 'react';
import BaseChart from '../../../src/components/BaseChart';
import { Provider } from '../../../src/components/ChartContext';
import { createMockChart } from '../../test-utils';

describe('<BaseChart />', function ()  {
  let clock;
  let chart;

  beforeEach(function () {
    chart = createMockChart();
    this.chartCreationFunc = sinon.stub();
    this.chartCreationFunc.returns(chart);
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  context('when mounted', function () {
    it('should create a Highcharts chart', function () {
      const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} chartType='chart' />);
      clock.tick(1);
      expect(this.chartCreationFunc).to.have.been.calledWith(wrapper.getDOMNode());
    });

    it('should create a chart context, with the chart and chart type', function (done) {
      const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} chartType='chart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0)).to.have.type(Provider);
        expect(wrapper.childAt(0).childAt(0)).to.have.prop('value').deep.equal({ chart, chartType: 'chart' });
        done();
      });
    });

    it('should create a chart context, with the chart and stockChart type', function (done) {
      const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} chartType='stockChart' />);
      clock.tick(1);

      wrapper.setState({ rendered: true }, () => {
        expect(wrapper.childAt(0).childAt(0)).to.have.type(Provider);
        expect(wrapper.childAt(0).childAt(0)).to.have.prop('value').deep.equal({ chart, chartType: 'stockChart' });
        done();
      });
    });
  });

  context('when unmounted', function () {
    it('destroys the chart instance', function () {
      const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} chartType='chart' />);
      clock.tick(1);
      expect(chart.destroy).not.to.have.been.called;
      wrapper.unmount();
      clock.tick(1);
      expect(chart.destroy).to.have.been.called;
    });
  });
});
