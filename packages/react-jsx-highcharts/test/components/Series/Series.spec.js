import React from 'react';
import { List } from 'immutable';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis, createMockSeries, uuidRegex } from '../../test-utils';
import Series from '../../../src/components/Series/Series';

describe('<Series />', () => {
  let testContext;

  let sandbox;

  beforeEach(() => {
    testContext = {};
    sandbox = sinon.createSandbox();
    sandbox.stub(Highcharts, 'addEvent');

    const { chartStubs, getChart } = createMockProvidedChart();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = axisStubs;
    testContext.seriesStubs = createMockSeries();
    testContext.chartStubs.addSeries.returns(testContext.seriesStubs)

    testContext.propsFromProviders = {
      getChart,
      getAxis,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when mounted', () => {
    it('adds an X series using the addSeries method', () => {
      testContext.axisStubs.id = 'myXAxisId';
      testContext.axisStubs.type = 'xAxis';

      mount(
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', xAxis: 'myXAxisId', type: 'line', data: [], visible: true }, true
      );
    });

    it('adds a Y series using the addSeries method', () => {
      testContext.axisStubs.id = 'myYAxisId';
      testContext.axisStubs.type = 'yAxis';

      mount(
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myYAxisId', type: 'line', data: [], visible: true }, true
      );
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <Series id="mySeriesIdStr" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.getCall(0).args[0].id).to.equal('mySeriesIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'mySeriesIdFromFunc'
      mount(
        <Series id={idFunc} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.getCall(0).args[0].id).to.equal('mySeriesIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <Series {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries.getCall(0).args[0].id).to.match(uuidRegex);
    });

    it('should pass additional props through to Highcharts addSeries method', () => {
      mount(
        <Series id="mySeries" data={[5]} step {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).to.have.been.calledWithMatch({
        id: 'mySeries', yAxis: 'myAxis', type: 'line', data: [5], visible: true, step: true
      }, true);
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleClick = sinon.spy();
      const handleShow = sinon.spy();

      mount(
        <Series id="mySeries" onClick={handleClick} onShow={handleShow}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.seriesStubs.update).to.have.been.calledWith({
        events: {
          click: handleClick,
          show: handleShow
        }
      });
    });

    it('supports mounting with Immutable List data', () => {
      const data = [1, 2, 3, 4, 5];
      mount(
        <Series id="mySeries" data={List(data)} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addSeries).to.have.been.calledWithMatch(
        { id: 'mySeries', yAxis: 'myAxis', type: 'line', data, visible: true }, true
      );
    });
  });

  describe('update', () => {
    it('should use the setData method on the correct series when the data changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).to.have.been.calledWith([1, 2, 3], true);
      expect(testContext.seriesStubs.update).not.to.have.been.called;
      expect(testContext.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the data hasn\'t changed', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[1, 2, 3]} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.reset();
      wrapper.setProps({ data: [1, 2, 3] });
      expect(testContext.seriesStubs.setData).not.to.have.been.called;
      expect(testContext.seriesStubs.update).not.to.have.been.called;
      expect(testContext.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the setData method on the correct series when the Immutable List changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...testContext.propsFromProviders} />
      );
      const newData = [1, 2, 3, 4, 5];
      testContext.seriesStubs.update.reset();
      wrapper.setProps({ data: List(newData) });
      expect(testContext.seriesStubs.setData).to.have.been.calledWith(newData, true);
      expect(testContext.seriesStubs.update).not.to.have.been.called;
      expect(testContext.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should NOT use the setData method if the Immutable List hasn\'t changed', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={List([1, 2, 3])} {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.reset();
      wrapper.setProps({ data: List([1, 2, 3]) });
      expect(testContext.seriesStubs.setData).not.to.have.been.called;
      expect(testContext.seriesStubs.update).not.to.have.been.called;
      expect(testContext.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the setVisible method on the correct series when the visibility changes', () => {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...testContext.propsFromProviders} />
      );
      testContext.seriesStubs.update.reset();
      wrapper.setProps({ visible: false });
      expect(testContext.seriesStubs.setVisible).to.have.been.calledWith(false);
      expect(testContext.seriesStubs.update).not.to.have.been.called;
      expect(testContext.seriesStubs.setData).not.to.have.been.called;
    });

    it('should use the update method on correct series if arbritary props change', () => {
      const wrapper = mount(
        <Series
          id="mySeries" visible {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(testContext.seriesStubs.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
      expect(testContext.seriesStubs.setData).not.to.have.been.called;
      expect(testContext.seriesStubs.setVisible).not.to.have.been.called;
    });

    it('should use the most performant method available even when multiple props change', () => {
      const wrapper = mount(
        <Series
          id="mySeries" data={[]} visible={false} {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ opposite: true, data: [4, 5, 6], visible: true });
      expect(testContext.seriesStubs.setData).to.have.been.calledWith([4, 5, 6]);
      expect(testContext.seriesStubs.setVisible).to.have.been.calledWith(true);
      expect(testContext.seriesStubs.update).to.have.been.calledWith({
        opposite: true
      });
    });
  });

  describe('when unmounted', () => {
    it('removes the correct series (if the series still exists)', () => {
      const wrapper = mount(
        <Series id="mySeries" {...testContext.propsFromProviders} />
      );
      wrapper.unmount();
      expect(testContext.seriesStubs.remove).to.have.been.called;
    });
  });
});
