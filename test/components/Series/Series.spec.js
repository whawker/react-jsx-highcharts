import React from 'react';
import { mount } from 'enzyme';
import Series from '../../../src/components/Series';
import { createMockSeries, createMockChart } from '../../test-utils';

describe('<Series />', function ()  {
  beforeEach(function () {
    this.series = createMockSeries();
    this.otherSeries = createMockSeries();

    const getStub = sinon.stub();
    getStub.withArgs('mySeries').returns(this.series);
    getStub.withArgs('myOtherSeries').returns(this.otherSeries);

    this.chart = createMockChart(getStub);

    this.context = {
      chart: this.chart
    };
  });

  describe('when mounted', function () {
    it('adds an X series using the addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="x" />, {context: this.context});
      expect(this.chart.addSeries).to.have.been.calledWith(
        { id: 'mySeries', xAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds a Y series using the addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="y" />, {context: this.context});
      expect(this.chart.addSeries).to.have.been.calledWith(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds should pass additional props through to Highcharts addSeries method', function () {
      mount(<Series id="mySeries" axisId="myAxis" dimension="y" data={[5]} step />, {context: this.context});
      expect(this.chart.addSeries).to.have.been.calledWith(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true }, true
      );
    });
  });

  describe('update', function () {
    it('should use the setData method on the correct series when the data changes', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="x" data={[]} />, {context: this.context});
      wrapper.setProps({ id: 'mySeries', dimension: 'x', data: [1, 2, 3] });
      expect(this.series.setData).to.have.been.calledWith([1, 2, 3]);
      expect(this.series.update).not.to.have.been.called;
      expect(this.otherSeries.setData).not.to.have.been.called;
    });

    it('should use the setVisible method on the correct series when the visibility changes', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="x" visible />, {context: this.context});
      wrapper.setProps({ id: 'mySeries', dimension: 'x', visible: false });
      expect(this.series.setVisible).to.have.been.calledWith(false);
      expect(this.series.update).not.to.have.been.called;
      expect(this.otherSeries.setVisible).not.to.have.been.called;
    });

    it('should use the update method on correct series if arbritary props change', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="x" />, {context: this.context});
      wrapper.setProps({ id: 'mySeries', dimension: 'x', newPropName: 'newPropValue' });
      expect(this.series.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(this.otherSeries.update).not.to.have.been.called;
    });

    it('should use the most performant method available even when multiple props change', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="x" data={[]} visible={false} />, {context: this.context});
      wrapper.setProps({ id: 'mySeries', dimension: 'x', opposite: true, data: [4, 5, 6], visible: true });
      expect(this.series.setData).to.have.been.calledWith([4, 5, 6]);
      expect(this.series.setVisible).to.have.been.calledWith(true);
      expect(this.series.update).to.have.been.calledWith({
        opposite: true
      });

      expect(this.otherSeries.setData).not.to.have.been.called;
      expect(this.otherSeries.setVisible).not.to.have.been.called;
      expect(this.otherSeries.update).not.to.have.been.called;
    });
  });

  describe('when unmounted', function () {
    it('removes the correct series', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="y" />, {context: this.context});
      wrapper.unmount();
      expect(this.series.remove).to.have.been.called;
      expect(this.otherSeries.remove).not.to.have.been.called;
    });
  });
});
