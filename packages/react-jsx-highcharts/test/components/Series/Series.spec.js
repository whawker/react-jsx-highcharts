import React from 'react';
import { List } from 'immutable';
import { Highcharts } from '../../test-utils';
import Series from '../../../src/components/Series/Series';

describe('<Series />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.addSeries = sinon.spy();
    this.update = sinon.spy();
    this.setData = sinon.spy();
    this.setVisible = sinon.spy();
    this.remove = sinon.spy();
    this.getSeries = sinon.stub();
    this.getSeries.returns('mock-series');

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'addEvent');

    this.propsFromProviders = {
      addSeries: this.addSeries,
      update: this.update,
      setData: this.setData,
      setVisible: this.setVisible,
      remove: this.remove,
      getSeries: this.getSeries,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('adds an X series using the addSeries method', function () {
      mount(
        <Series id="mySeries" axisId="myAxis" dimension="x" {...this.propsFromProviders} />
      );
      expect(this.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', xAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds a Y series using the addSeries method', function () {
      mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" {...this.propsFromProviders} />
      );
      expect(this.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [], visible: true }, true
      );
    });

    it('should pass additional props through to Highcharts addSeries method', function () {
      mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" data={[5]} step {...this.propsFromProviders} />
      );
      expect(this.addSeries).to.have.been.calledWithMatch({
        id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true
      }, true);
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleClick = sinon.spy();
      const handleShow = sinon.spy();

      mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" onClick={handleClick} onShow={handleShow}
          {...this.propsFromProviders} />
      );
      expect(this.update).to.have.been.calledWith({
        events: {
          click: handleClick,
          show: handleShow
        }
      });
    });

    it('supports mounting with Immutable List data', function () {
      const data = [1, 2, 3, 4, 5];
      mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" data={List(data)} {...this.propsFromProviders} />
      );
      expect(this.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data, visible: true }, true
      );
    });
  });

  describe('update', function () {
    it('should use the setData method on the correct series when the data changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={[]} {...this.propsFromProviders} />
      );
      this.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(this.setData).to.have.been.calledWith([1, 2, 3], true);
      expect(this.update).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the data hasn\'t changed', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={[1, 2, 3]} {...this.propsFromProviders} />
      );
      this.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(this.setData).not.to.have.been.called;
      expect(this.update).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should use the setData method on the correct series when the Immutable List changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={List([1, 2, 3])} {...this.propsFromProviders} />
      );
      const newData = [1, 2, 3, 4, 5];
      this.update.reset();
      wrapper.setProps({ data: List(newData) });
      expect(this.setData).to.have.been.calledWith(newData, true);
      expect(this.update).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the Immutable List hasn\'t changed', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={List([1, 2, 3])} {...this.propsFromProviders} />
      );
      this.update.reset();
      wrapper.setProps({ data: List([1, 2, 3]) });
      expect(this.setData).not.to.have.been.called;
      expect(this.update).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should use the setVisible method on the correct series when the visibility changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" visible {...this.propsFromProviders} />
      );
      this.update.reset();
      wrapper.setProps({ visible: false });
      expect(this.setVisible).to.have.been.calledWith(false);
      expect(this.update).not.to.have.been.called;
      expect(this.setData).not.to.have.been.called;
    });

    it('should use the update method on correct series if arbritary props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" visible {...this.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(this.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(this.setData).not.to.have.been.called;
      expect(this.setVisible).not.to.have.been.called;
    });

    it('should use the most performant method available even when multiple props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" axisId="myAxis" dimension="x" data={[]} visible={false} {...this.propsFromProviders} />
      );
      wrapper.setProps({ opposite: true, data: [4, 5, 6], visible: true });
      expect(this.setData).to.have.been.calledWith([4, 5, 6]);
      expect(this.setVisible).to.have.been.calledWith(true);
      expect(this.update).to.have.been.calledWith({
        opposite: true
      });
    });
  });

  describe('when unmounted', function () {
    it('removes the correct series (if the series still exists)', function () {
      const wrapper = mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" {...this.propsFromProviders} />
      );
      wrapper.unmount();
      expect(this.remove).to.have.been.called;
    });

    it('does nothing if the axis has already been removed', function () {
      const wrapper = mount(
        <Series id="mySeries" axisId="myAxis" dimension="y" {...this.propsFromProviders} getSeries={() => {}} />
      );
      wrapper.unmount();
      expect(this.remove).not.to.have.been.called;
    });
  });
});
