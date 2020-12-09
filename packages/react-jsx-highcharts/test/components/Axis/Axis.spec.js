import * as React from 'react';
import { render } from '@testing-library/react';

import {
  createMockProvidedChart,
  createMockAxis,
  uuidRegex
} from '../../test-utils';
import Axis from '../../../src/components/Axis/Axis';
import ChartContext from '../../../src/components/ChartContext';

describe('<Axis />', () => {
  let testContext;
  let ProvidedAxis;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, needsRedraw } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = createMockAxis({});
    testContext.chartStubs.addAxis.mockReturnValue(testContext.axisStubs);
    testContext.needsRedraw = needsRedraw;

    ProvidedAxis = props => (
      <ChartContext.Provider value={chartStubs}>
        <Axis {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted (dynamic)', () => {
    it('adds an X axis using the addAxis method', () => {
      render(<ProvidedAxis id="myAxis" isX />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledTimes(1);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        { id: 'myAxis', title: { text: null }, isX: true, events: {} },
        true,
        false
      );
      expect(testContext.axisStubs.remove).not.toHaveBeenCalled();
      expect(testContext.axisStubs.update).not.toHaveBeenCalled();
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('adds a Y axis using the addAxis method', () => {
      render(<ProvidedAxis id="myAxis" isX={false} />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        { id: 'myAxis', title: { text: null }, isX: false, events: {} },
        false,
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('uses the provided ID if id prop is a string', () => {
      render(<ProvidedAxis id="myAxisIdStr" />);
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toEqual(
        'myAxisIdStr'
      );
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myAxisIdFromFunc';
      render(<ProvidedAxis id={idFunc} />);
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toEqual(
        'myAxisIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      render(<ProvidedAxis />);
      expect(testContext.chartStubs.addAxis.mock.calls[0][0].id).toMatch(
        uuidRegex
      );
    });

    it('should pass additional props through to Highcharts addAxis method', () => {
      render(<ProvidedAxis id="myAxis" isX min={10} max={100} reversed />);
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        {
          id: 'myAxis',
          title: { text: null },
          min: 10,
          max: 100,
          reversed: true,
          isX: true,
          events: {}
        },
        true,
        false
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = jest.fn();
      const handleAfterSetExtremes = jest.fn();

      render(
        <ProvidedAxis
          id="myAxis"
          isX
          onSetExtremes={handleSetExtremes}
          onAfterSetExtremes={handleAfterSetExtremes}
        />
      );
      expect(testContext.chartStubs.addAxis).toHaveBeenCalledWith(
        expect.objectContaining({
          events: {
            setExtremes: handleSetExtremes,
            afterSetExtremes: handleAfterSetExtremes
          }
        }),
        true,
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });
  });

  describe('when mounted (NOT dynamic)', () => {
    beforeEach(() => {
      testContext.chartStubs.get.mockReturnValue(testContext.axisStubs);
    });

    it('retrieve the axis by id', () => {
      render(<ProvidedAxis id="myAxis" isX={false} dynamicAxis={false} />);
      expect(testContext.chartStubs.get).toHaveBeenCalledWith('myAxis');
    });

    it('updates a non dynamic axis using the update method', () => {
      render(<ProvidedAxis id="myAxis" isX={false} dynamicAxis={false} />);
      expect(testContext.axisStubs.update).toHaveBeenCalledWith(
        expect.objectContaining(
          { id: 'myAxis', title: { text: null }, isX: false, events: {} },
          true
        ),
        false
      );
    });

    it('should pass additional props through to Highcharts update method', () => {
      render(
        <ProvidedAxis
          id="myAxis"
          isX={false}
          dynamicAxis={false}
          min={10}
          max={100}
          reversed
        />
      );
      expect(testContext.axisStubs.update).toHaveBeenCalledWith(
        {
          id: 'myAxis',
          title: { text: null },
          min: 10,
          max: 100,
          reversed: true,
          isX: false,
          events: {}
        },
        false
      );
    });

    it('subscribes to Highcharts events for props that look like event handlers', () => {
      const handleSetExtremes = jest.fn();
      const handleAfterSetExtremes = jest.fn();

      render(
        <ProvidedAxis
          id="myAxis"
          isX={false}
          dynamicAxis={false}
          onSetExtremes={handleSetExtremes}
          onAfterSetExtremes={handleAfterSetExtremes}
        />
      );
      expect(testContext.axisStubs.update).toHaveBeenCalledWith(
        expect.objectContaining({
          events: {
            setExtremes: handleSetExtremes,
            afterSetExtremes: handleAfterSetExtremes
          }
        }),
        false
      );
    });
  });

  describe('update', () => {
    it('should update the axis if the component props change', () => {
      const wrapper = render(<ProvidedAxis id="myAxis" isX />);
      wrapper.rerender(
        <ProvidedAxis id="myAxis" isX newPropName="newPropValue" />
      );

      expect(testContext.axisStubs.update).toHaveBeenCalledWith(
        {
          newPropName: 'newPropValue'
        },
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
