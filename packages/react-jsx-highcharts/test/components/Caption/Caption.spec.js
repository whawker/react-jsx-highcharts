import * as React from 'react';
import { render } from '@testing-library/react';

import { createMockProvidedChart } from '../../test-utils';
import Caption from '../../../src/components/Caption/Caption';
import ChartContext from '../../../src/components/ChartContext';

describe('<Caption />', () => {
  let testContext;
  let ProvidedCaption;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, needsRedraw } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    testContext.needsRedraw = needsRedraw;

    ProvidedCaption = props => (
      <ChartContext.Provider value={chartStubs}>
        <Caption {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('adds a caption using the Highcharts setCaption method', () => {
      render(<ProvidedCaption>My Caption</ProvidedCaption>);
      expect(testContext.chartStubs.setCaption).toHaveBeenCalledWith({
        text: 'My Caption'
      });
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(1);
    });

    it('should pass additional props through to Highcharts setTitle method', () => {
      render(<ProvidedCaption align="right">My Other Caption</ProvidedCaption>);
      expect(testContext.chartStubs.setCaption).toHaveBeenCalledWith({
        text: 'My Other Caption',
        align: 'right'
      });
    });
  });

  describe('update', () => {
    it('should use the setCaption method when the data changes', () => {
      const wrapper = render(<ProvidedCaption>My Caption</ProvidedCaption>);
      wrapper.rerender(
        <ProvidedCaption x={10} y={20}>
          My New Caption
        </ProvidedCaption>
      );

      expect(testContext.chartStubs.setCaption).toHaveBeenCalledWith({
        x: 10,
        y: 20,
        text: 'My New Caption'
      });
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });

  describe('when unmounted', () => {
    it('removes the caption by setting the text to null', () => {
      const wrapper = render(<ProvidedCaption>My Caption</ProvidedCaption>);
      wrapper.unmount();
      expect(testContext.chartStubs.setCaption).toHaveBeenCalledWith({
        text: null
      });
      expect(testContext.chartStubs.setCaption).toHaveBeenCalledTimes(2);
      expect(testContext.needsRedraw).toHaveBeenCalledTimes(2);
    });
  });
});
