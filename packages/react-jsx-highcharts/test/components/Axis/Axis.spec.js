import React from 'react';
import { Highcharts, createMockProvidedChart, createMockAxis, uuidRegex } from '../../test-utils'
import Axis from '../../../src/components/Axis/Axis';

describe('<Axis />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, getChart } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = createMockAxis({});
    testContext.chartStubs.addAxis.mockReturnValue(testContext.axisStubs)

    testContext.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });


  describe('when mounted (dynamic)', () => {
    it('adds an X axis using the addAxis method', () => {
      mount(<Axis id="myAxis" isX {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'myAxis', title: { text: null } }), true, false
      );
    });

    it('adds a Y axis using the addAxis method', () => {
      mount(<Axis id="myAxis" isX={false} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'myAxis', title: { text: null } }), false, false
      );
    });

    it('uses the provided ID if id prop is a string', () => {
      mount(
        <Axis id="myAxisIdStr" {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toEqual('myAxisIdStr');
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myAxisIdFromFunc'
      mount(
        <Axis id={idFunc} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toEqual('myAxisIdFromFunc');
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      mount(
        <Axis {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toMatch(uuidRegex);
    });

    it('should pass additional props through to Highcharts addAxis method', () => {
      mount(<Axis id="myAxis" isX min={10} max={100} reversed {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }), true, false
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = jest.fn();
      const handleAfterSetExtremes = jest.fn();

      mount(
        <Axis id="myAxis" isX onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.update).toHaveBeenCalledWith({
        events: expect.objectContaining({
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        })
      }, true);
    });
  });

  describe('when mounted (NOT dynamic)', () => {
    beforeEach(() => {
      testContext.chartStubs.get.mockReturnValue(testContext.axisStubs)
    })

    it('retrieve the axis by id', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.get).toHaveBeenCalledWith('myAxis');
    });

    it('updates a non dynamic axis using the update method', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.update).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'myAxis', title: { text: null } }, true
      ), false);
    });

    it('should pass additional props through to Highcharts update method', () => {
      mount(<Axis id="myAxis" isX={false} dynamicAxis={false} min={10} max={100} reversed {...testContext.propsFromProviders} />);
      expect(testContext.axisStubs.update).toHaveBeenCalledWith(expect.objectContaining(
        { id: 'myAxis', title: { text: null }, min: 10, max: 100, reversed: true }, true
      ), false);
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = jest.fn();
      const handleAfterSetExtremes = jest.fn();

      mount(
        <Axis id="myAxis" isX={false} dynamicAxis={false} onSetExtremes={handleSetExtremes} onAfterSetExtremes={handleAfterSetExtremes}
          {...testContext.propsFromProviders} />
      );
      expect(testContext.axisStubs.update).toHaveBeenCalledWith({
        events: expect.objectContaining({
          setExtremes: handleSetExtremes,
          afterSetExtremes: handleAfterSetExtremes
        })
      }, true);
    });
  });

  describe('update', () => {
    it('should update the axis if the component props change', () => {
      const wrapper = mount(
        <Axis id="myAxis" isX {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ newPropName: 'newPropValue' });
      expect(testContext.axisStubs.update).toHaveBeenCalledWith({
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
      expect(testContext.axisStubs.remove).toHaveBeenCalled();
    });
  });
});
