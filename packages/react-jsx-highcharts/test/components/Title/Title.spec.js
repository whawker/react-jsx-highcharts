import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Title from '../../../src/components/Title/Title';
import ChartContext from '../../../src/components/ChartContext';

describe('<Title />', () => {
  let testContext;
  let ProvidedTitle;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;

    ProvidedTitle = props => (
      <ChartContext.Provider value={chartStubs}>
        <Title {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('adds a title using the Highcharts setTitle method', () => {
      render(<ProvidedTitle>My Title</ProvidedTitle>);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        { text: 'My Title' },
        null,
        false
      );
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledTimes(1);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should pass additional props through to Highcharts setTitle method', () => {
      render(<ProvidedTitle align="right">My Other Title</ProvidedTitle>);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        { text: 'My Other Title', align: 'right' },
        null,
        false
      );
    });
  });

  describe('update', () => {
    it('should use the setTitle method when the data changes', () => {
      const wrapper = render(<ProvidedTitle>My Title</ProvidedTitle>);
      wrapper.rerender(
        <ProvidedTitle x={10} y={20}>
          My New Title
        </ProvidedTitle>
      );

      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        { x: 10, y: 20, text: 'My New Title' },
        null,
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('removes the title by setting the title to text', () => {
      const wrapper = render(<ProvidedTitle>My Title</ProvidedTitle>);
      wrapper.unmount();
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        { text: null },
        null,
        false
      );
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
