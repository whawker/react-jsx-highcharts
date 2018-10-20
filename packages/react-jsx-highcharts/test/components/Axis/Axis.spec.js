import React from 'react';
import { Highcharts, createMockProvidedChart, createMockAxis, uuidRegex } from '../../test-utils'
import Axis from '../../../src/components/Axis/Axis';

describe('<Axis />', () => {
  let testContext;

  let sandbox = null;

  beforeEach(() => {
    testContext = {};
    sandbox = sinon.createSandbox();
    sandbox.stub(Highcharts, 'addEvent');

    const { chartStubs, getChart } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = createMockAxis({});
    testContext.chartStubs.addAxis.returns(testContext.axisStubs)

    testContext.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when mounted (dynamic)', () => {
    it('adds an X axis using the addAxis method', () => {
      mount(<Axis id="myAxis" isX {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', () => {
      mount(<Axis id="myAxis" isX={false} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, false, true
      );
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <Axis id="myAxisIdStr" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.getCall(0).args[0].id).to.equal('myAxisIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myAxisIdFromFunc'
      mount(
        <Axis id={idFunc} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.getCall(0).args[0].id).to.equal('myAxisIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <Axis {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.getCall(0).args[0].id).to.match(uuidRegex);
    });

    it('should pass additional props through to Highcharts addAxis method', () => {
      mount(<Axis id="myAxis" isX min={10} max={100} reversed {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" isX onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.update).to.have.been.calledWith({
        events: {
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        }
      });
    });
  });

  describe('when mounted (NOT dynamic)', () => {
    beforeEach(() => {
      testContext.chartStubs.get.returns(testContext.axisStubs)
    })

    it('retrieve the axis by id', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.get).to.have.been.calledWith('myAxis');
    });

    it('updates a non dynamic axis using the update method', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true
      );
    });

    it('should pass additional props through to Highcharts update method', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} min={10} max={100} reversed {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" isX={false} dynamicAxis={false} onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.update).to.have.been.calledWith({
        events: {
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        }
      });
    });
  });

  describe('update', () => {
    it('should update the axis if the component props change', () => {
      const wrapper = mount(
        <Axis id="myAxis" isX {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(testContext.axisStubs.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
    });
  });

  describe('when unmounted', () => {
    it('removes the axis', () => {
      const wrapper = mount(
        <Axis id="myAxis" isX {...testContext.propsFromProviders} />
      );
      wrapper.unmount();
      expect(testContext.axisStubs.remove).to.have.been.called;
    });
  });
});
