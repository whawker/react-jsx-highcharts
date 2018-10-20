import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Subtitle from '../../../src/components/Subtitle/Subtitle';

describe('<Subtitle />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
    };
  });

  describe('when mounted', () => {
    it('adds a subtitle using the Highcharts setTitle method', () => {
      mount(<Subtitle {...testContext.propsFromProviders}>My Subtitle</Subtitle>);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        null, expect.objectContaining({ text: 'My Subtitle' }), true
      );
    });

    it('should pass additional props through to Highcharts setTitle method', () => {
      mount(<Subtitle align="right" {...testContext.propsFromProviders}>My Other Subtitle</Subtitle>);
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(
        null, expect.objectContaining({ text: 'My Other Subtitle', align: 'right' }), true
      );
    });
  });

  describe('update', () => {
    it('should use the setTitle method when the data changes', () => {
      const wrapper = mount(
        <Subtitle {...testContext.propsFromProviders}>My Subtitle</Subtitle>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Subtitle' });
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(null, { x: 10, y: 20, text: 'My New Subtitle' }, true);
    });
  });

  describe('when unmounted', () => {
    it('removes the subtitle by setting the subtitle to text', () => {
      const wrapper = mount(<Subtitle {...testContext.propsFromProviders}>My Subtitle</Subtitle>);
      wrapper.unmount();
      expect(testContext.chartStubs.setTitle).toHaveBeenCalledWith(null, { text: null }, true);
    });
  });
});
