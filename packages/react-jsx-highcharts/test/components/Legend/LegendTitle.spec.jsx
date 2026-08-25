import * as React from 'react';
import { render } from '@testing-library/react';

import LegendTitle from '../../../src/components/Legend/LegendTitle';
import { createMockProvidedChart } from '../../test-utils';
import ChartContext from '../../../src/components/ChartContext';

describe('<Legend.Title />', () => {
  let testContext;
  let ProvidedLegendTitle;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    ProvidedLegendTitle = props => (
      <ChartContext.Provider value={chartStubs}>
        <LegendTitle {...props} />
      </ChartContext.Provider>
    );
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;
  });

  describe('when mounted', () => {
    it('add legend using the Highcharts update method', () => {
      render(<ProvidedLegendTitle>My Legend Title</ProvidedLegendTitle>);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            title: {
              text: 'My Legend Title'
            }
          }
        },
        false
      );
    });

    it('updates the legend with the passed props', () => {
      render(
        <ProvidedLegendTitle style={{ color: 'red' }}>
          My Legend Title
        </ProvidedLegendTitle>
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            title: {
              text: 'My Legend Title',
              style: { color: 'red' }
            }
          }
        },
        false
      );
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(
        <ProvidedLegendTitle>My Legend Title</ProvidedLegendTitle>
      );
      wrapper.rerender(
        <ProvidedLegendTitle>My New Legend Title</ProvidedLegendTitle>
      );

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            title: {
              text: 'My New Legend Title'
            }
          }
        },
        false
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the LegendTitle', () => {
      const wrapper = render(
        <ProvidedLegendTitle>My Legend Title</ProvidedLegendTitle>
      );
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          legend: {
            title: {
              text: null
            }
          }
        },
        false
      );
    });
  });
});
