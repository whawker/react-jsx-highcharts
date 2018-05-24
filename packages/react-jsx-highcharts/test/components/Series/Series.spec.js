import React from 'react';
import { List } from 'immutable';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis, createMockSeries, uuidRegex } from '../../test-utils';
import Series from '../../../src/components/Series/Series';

describe('<Series />', function ()  {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'addEvent');

    const { chartStubs, getChart } = createMockProvidedChart();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });

    this.chartStubs = chartStubs;
    this.axisStubs = axisStubs;
    this.seriesStubs = createMockSeries();
    this.chartStubs.addSeries.returns(this.seriesStubs)

    this.propsFromProviders = {
      getChart,
      getAxis,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  context('when mounted', function () {
    it('adds an X series using the addSeries method', function () {
      this.axisStubs.id = 'myXAxisId';
      this.axisStubs.type = 'xAxis';

      mount(
        <Series id="mySeries" {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', xAxis: 'myXAxisId', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds a Y series using the addSeries method', function () {
      this.axisStubs.id = 'myYAxisId';
      this.axisStubs.type = 'yAxis';

      mount(
        <Series id="mySeries" {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myYAxisId', type: 'line', data: [], visible: true }, true
      );
    });

    it('uses the provided ID if id prop is a string', function () {
      mount(
        <Series id="mySeriesIdStr" {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries.getCall(0).args[0].id).to.equal('mySeriesIdStr');
    });

    it('resolves the ID if id prop is a function', function () {
      const idFunc = () => 'mySeriesIdFromFunc'
      mount(
        <Series id={idFunc} {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries.getCall(0).args[0].id).to.equal('mySeriesIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', function () {
      mount(
        <Series {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries.getCall(0).args[0].id).to.match(uuidRegex);
    });

    it('should pass additional props through to Highcharts addSeries method', function () {
      mount(
        <Series id="mySeries" data={[5]} step {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries).to.have.been.calledWithMatch({
        id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true
      }, true);
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleClick = sinon.spy();
      const handleShow = sinon.spy();

      mount(
        <Series id="mySeries" onClick={handleClick} onShow={handleShow}
          {...this.propsFromProviders} />
      );
      expect(this.seriesStubs.update).to.have.been.calledWith({
        events: {
          click: handleClick,
          show: handleShow
        }
      });
    });

    it('supports mounting with Immutable List data', function () {
      const data = [1, 2, 3, 4, 5];
      mount(
        <Series id="mySeries" data={List(data)} {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data, visible: true }, true
      );
    });
  });

  context('update', function () {
    it('should use the setData method on the correct series when the data changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} {...this.propsFromProviders} />
      );
      this.seriesStubs.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(this.seriesStubs.setData).to.have.been.calledWith([1, 2, 3], true);
      expect(this.seriesStubs.update).not.to.have.been.called;
      expect(this.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the data hasn\'t changed', function () {
      const wrapper = mount(
        <Series
          id="mySeries" data={[1, 2, 3]} {...this.propsFromProviders} />
      );
      this.seriesStubs.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(this.seriesStubs.setData).not.to.have.been.called;
      expect(this.seriesStubs.update).not.to.have.been.called;
      expect(this.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the setData method on the correct series when the Immutable List changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...this.propsFromProviders} />
      );
      const newData = [1, 2, 3, 4, 5];
      this.seriesStubs.update.reset();
      wrapper.setProps({ data: List(newData) });
      expect(this.seriesStubs.setData).to.have.been.calledWith(newData, true);
      expect(this.seriesStubs.update).not.to.have.been.called;
      expect(this.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the Immutable List hasn\'t changed', function () {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...this.propsFromProviders} />
      );
      this.seriesStubs.update.reset();
      wrapper.setProps({ data: List([1, 2, 3]) });
      expect(this.seriesStubs.setData).not.to.have.been.called;
      expect(this.seriesStubs.update).not.to.have.been.called;
      expect(this.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the setVisible method on the correct series when the visibility changes', function () {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...this.propsFromProviders} />
      );
      this.seriesStubs.update.reset();
      wrapper.setProps({ visible: false });
      expect(this.seriesStubs.setVisible).to.have.been.calledWith(false);
      expect(this.seriesStubs.update).not.to.have.been.called;
      expect(this.seriesStubs.setData).not.to.have.been.called;
    });

    it('should use the update method on correct series if arbritary props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...this.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(this.seriesStubs.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(this.seriesStubs.setData).not.to.have.been.called;
      expect(this.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the most performant method available even when multiple props change', function () {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} visible={false} {...this.propsFromProviders} />
      );
      wrapper.setProps({ opposite: true, data: [4, 5, 6], visible: true });
      expect(this.seriesStubs.setData).to.have.been.calledWith([4, 5, 6]);
      expect(this.seriesStubs.setVisible).to.have.been.calledWith(true);
      expect(this.seriesStubs.update).to.have.been.calledWith({
        opposite: true
      });
    });
  });

  context('when unmounted', function () {
    it('removes the correct series (if the series still exists)', function () {
      const wrapper = mount(
        <Series id="mySeries" {...this.propsFromProviders} />
      );
      wrapper.unmount();
      expect(this.seriesStubs.remove).to.have.been.called;
    });
  });
});
