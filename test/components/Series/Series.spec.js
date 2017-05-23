import React from 'react';
import { mount } from 'enzyme';
import Series from '../../../src/components/Series';

describe('<Series />', function ()  {
  beforeEach(function () {
    this.series = {
      remove: sinon.spy(),
      update: sinon.spy()
    };
    this.otherSeries = {
      remove: sinon.spy(),
      update: sinon.spy()
    };

    const getStub = sinon.stub();
    getStub.withArgs('mySeries').returns(this.series);
    getStub.withArgs('myOtherSeries').returns(this.otherSeries);

    this.chart = {
      addSeries: sinon.spy(),
      get: getStub
    };

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
    it('should update the correct series if the component props change', function () {
      const wrapper = mount(<Series id="mySeries" axisId="myAxis" dimension="x" />, {context: this.context});
      wrapper.setProps({ id: 'mySeries', dimension: 'x', newPropName: 'newPropValue' });
      expect(this.series.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
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
