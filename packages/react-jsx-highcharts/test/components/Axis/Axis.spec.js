import React from 'react';
import { Highcharts, createMockProvidedChart, createMockAxis, uuidRegex } from '../../test-utils'
import Axis from '../../../src/components/Axis/Axis';

describe('<Axis />', function ()  {
  let sandbox = null;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'addEvent');

    const { chartStubs, getChart } = createMockProvidedChart();

    this.chartStubs = chartStubs;
    this.axisStubs = createMockAxis({});
    this.chartStubs.addAxis.returns(this.axisStubs)

    this.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  context('when mounted (dynamic)', function () {
    it('adds an X axis using the addAxis method', function () {
      mount(<Axis id="myAxis" isX {...this.propsFromProviders} />);
      expect(this.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true, true
      );
    });

    it('adds a Y axis using the addAxis method', function () {
      mount(<Axis id="myAxis" isX={false} {...this.propsFromProviders} />);
      expect(this.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, false, true
      );
    });

    it('uses the provided ID if id prop is a string', function () {
      mount(
        <Axis id="myAxisIdStr" {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addAxis.getCall(0).args[0].id).to.equal('myAxisIdStr');
    });

    it('resolves the ID if id prop is a function', function () {
      const idFunc = () => 'myAxisIdFromFunc'
      mount(
        <Axis id={idFunc} {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addAxis.getCall(0).args[0].id).to.equal('myAxisIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', function () {
      mount(
        <Axis {...this.propsFromProviders} />
      );
      expect(this.chartStubs.addAxis.getCall(0).args[0].id).to.match(uuidRegex);
    });

    it('should pass additional props through to Highcharts addAxis method', function () {
      mount(<Axis id="myAxis" isX min={10} max={100} reversed {...this.propsFromProviders} />);
      expect(this.chartStubs.addAxis).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" isX onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...this.propsFromProviders} />
      );
      expect(this.axisStubs.update).to.have.been.calledWith({
        events: {
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        }
      });
    });
  });

  describe('when mounted (NOT dynamic)', function () {
    beforeEach(function() {
      this.chartStubs.get.returns(this.axisStubs)
    })

    it('retrieve the zAxis', function () {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...this.propsFromProviders} />);
      expect(this.chartStubs.get).to.have.been.calledWith('zAxis');
    });

    it('updates a non dynamic axis using the update method', function () {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...this.propsFromProviders} />);
      expect(this.axisStubs.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null } }, true
      );
    });

    it('should pass additional props through to Highcharts update method', function () {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} min={10} max={100} reversed {...this.propsFromProviders} />);
      expect(this.axisStubs.update).to.have.been.calledWithMatch(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleSetExtremes = sinon.spy();
      const handleAfterSetExtremes = sinon.spy();

      mount(
        <Axis id="myAxis" isX={false} dynamicAxis={false} onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...this.propsFromProviders} />
      );
      expect(this.axisStubs.update).to.have.been.calledWith({
        events: {
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        }
      });
    });
  });

  context('update', function () {
    it('should update the axis if the component props change', function () {
      const wrapper = mount(
        <Axis id="myAxis" isX {...this.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(this.axisStubs.update).to.have.been.calledWith({
        newPropName: 'newPropValue'
      });
    });
  });

  context('when unmounted', function () {
    it('removes the axis', function () {
      const wrapper = mount(
        <Axis id="myAxis" isX {...this.propsFromProviders} />
      );
      wrapper.unmount();
      expect(this.axisStubs.remove).to.have.been.called;
    });
  });
});
