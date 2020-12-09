import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Subtitle from '../../../src/components/Subtitle/Subtitle';
import ChartContext from '../../../src/components/ChartContext';

describe('<Subtitle />', () => {
  let testContext;
  let ProvidedSubtitle;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    ProvidedSubtitle = props => (
      <ChartContext.Provider value={chartStubs}>
        <Subtitle {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('adds a subtitle using the Highcharts setTitle method', () => {
      render(<ProvidedSubtitle>My Subtitle</ProvidedSubtitle>);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledTimes(1);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        undefined,
        { text: 'My Subtitle' },
        false
      );
    });

    it('should pass additional props through to Highcharts setTitle method', () => {
      render(
        <ProvidedSubtitle align="right">My Other Subtitle</ProvidedSubtitle>
      );
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        undefined,
        { text: 'My Other Subtitle', align: 'right' },
        false
      );
    });
  });

  describe('update', () => {
    it('should use the setTitle method when the data changes', () => {
      const wrapper = render(<ProvidedSubtitle>My Subtitle</ProvidedSubtitle>);
      testContext.chartStubs.setTitle.mockClear();
      wrapper.rerender(
        <ProvidedSubtitle x={10} y={20}>
          My New Subtitle
        </ProvidedSubtitle>
      );

      expect(testContext.chartStubs.setTitle).toHaveBeenCalledTimes(1);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        undefined,
        { x: 10, y: 20, text: 'My New Subtitle' },
        false
      );
    });
  });

  describe('when unmounted', () => {
    it('removes the subtitle by setting the subtitle to text', () => {
      const wrapper = render(<ProvidedSubtitle>My Subtitle</ProvidedSubtitle>);
      testContext.chartStubs.setTitle.mockClear();
      wrapper.unmount();

      expect(testContext.chartStubs.setTitle).toHaveBeenCalledTimes(1);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        undefined,
        { text: null },
        false
      );
    });
  });
});
