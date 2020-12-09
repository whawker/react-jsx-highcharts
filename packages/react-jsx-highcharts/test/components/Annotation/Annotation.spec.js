import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart, uuidRegex } from '../../test-utils';
import Annotation from '../../../src/components/Annotation/Annotation';
import ChartContext from '../../../src/components/ChartContext';

describe('<Annotation />', () => {
  let testContext;
  let ProvidedAnnotation;

  beforeEach(() => {
    testContext = {};

    const { chartStubs, needsRedraw } = createMockProvidedChart();
    chartStubs.addAnnotation = jest.fn();
    chartStubs.removeAnnotation = jest.fn();
    testContext.chartStubs = chartStubs;
    ProvidedAnnotation = props => (
      <ChartContext.Provider value={chartStubs}>
        <Annotation {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('adds an annotation using the chart addAnnotation method', () => {
      render(<ProvidedAnnotation id="My Annotation" />);
      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith({
        id: 'My Annotation'
      });
    });

    it('should pass additional props through to chart addAnnotation method', () => {
      render(
        <ProvidedAnnotation
          id="My Other Annotation"
          labels={[{ text: 'label', point: { x: 200, y: 200 } }]}
          labelOptions={{ borderColor: 'red' }}
        />
      );
      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith({
        id: 'My Other Annotation',
        labelOptions: { borderColor: 'red' },
        labels: [{ text: 'label', point: { x: 200, y: 200 } }]
      });
    });

    it('uses the provided ID if id prop is a string', () => {
      render(<ProvidedAnnotation id="myPlotLineIdStr" value={2} />);
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toBe(
        'myPlotLineIdStr'
      );
    });

    it('resolves the ID if id prop is a function', () => {
      const idFunc = () => 'myPlotLineIdFromFunc';
      render(<ProvidedAnnotation id={idFunc} value={2} />);
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toBe(
        'myPlotLineIdFromFunc'
      );
    });

    it('uses a uuid as an ID if no id prop provided', () => {
      render(<ProvidedAnnotation />);
      expect(testContext.chartStubs.addAnnotation.mock.calls[0][0].id).toMatch(
        uuidRegex
      );
    });
  });

  describe('when unmounted', () => {
    it('removes the annotation by id (if the parent chart still exists)', () => {
      const wrapper = render(<ProvidedAnnotation id="My Annotation" />);
      testContext.chartStubs.removeAnnotation.mockReset();
      wrapper.unmount();
      expect(testContext.chartStubs.removeAnnotation).toHaveBeenCalledWith(
        'My Annotation'
      );
    });
  });

  describe('when updated', () => {
    it('removes and re-adds annotation with new props', () => {
      const wrapper = render(
        <ProvidedAnnotation
          id="My Annotation"
          labels={[{ text: 'label', point: { x: 200, y: 200 } }]}
        />
      );
      testContext.chartStubs.addAnnotation.mockReset();
      wrapper.rerender(
        <ProvidedAnnotation
          id="My Annotation"
          labels={[{ text: 'label', point: { x: 100, y: 100 } }]}
        />
      );

      expect(testContext.chartStubs.removeAnnotation).toHaveBeenCalledWith(
        'My Annotation'
      );

      expect(testContext.chartStubs.addAnnotation).toHaveBeenCalledWith({
        id: 'My Annotation',
        labels: [{ text: 'label', point: { x: 100, y: 100 } }]
      });
    });
  });
});
